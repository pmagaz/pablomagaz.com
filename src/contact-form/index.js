import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import multer from 'multer';
import NeDB from 'nedb';
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

const app = express();
const port = 3000;
const max_submits = 3;
const hours = 5;

const db = new NeDB({ filename: 'ip_store.db', autoload: true });

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().any());  // Handle multipart form data

const siteConfigs = {
  'pablomagaz.com': {
    emailAccount: process.env.GMAIL_ACCOUNT,
    emailPass: process.env.GMAIL_APP_PASS,
    recaptchaKey: process.env.RECAPTCHA_SECRET_KEY
  },
  'terapiapsicologica.ch': {
    emailAccount: process.env.GMAIL_ACCOUNT2,
    emailPass: process.env.GMAIL_APP_PASS2,
    recaptchaKey: process.env.RECAPTCHA_SECRET_KEY2
  },
  // 'belindasanchez.com': {
  //   emailAccount: process.env.GMAIL_ACCOUNT2,
  //   emailPass: process.env.GMAIL_APP_PASS2,
  //   recaptchaKey: process.env.RECAPTCHA_SECRET_KEY2
  // }
};

async function verifyRecaptcha(token, site) {
  return new Promise(async (resolve, reject) => {
    if (!token) {
	console.log("no token");
      return reject({ success: false }); 
    }

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: siteConfigs[site].recaptchaKey,
          response: token
        })
      });

      const data = await response.json();
      if (data.success) {
        resolve({ success: true });
      } else {
        reject({ success: false });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      reject({ success: false });
    }
  });
}

// Handle form submission with rate limiting
app.post('/send-form', async (req, res) => {
    const { site, name, email, message } = req.body;
    const token = req.body['g-recaptcha-response'];
    const clientIp = getClientIp(req); 

    try {
        // Check if site configuration exists
        if (!siteConfigs[site]) {
            return res.status(422).send('Invalid site configuration');
        }

        // Check captcha
        let captcha = await verifyRecaptcha(token, site);

        // Check if IP exists in database
        let ipEntry = await findIP(clientIp);

        if (ipEntry) {
            // IP exists, check timestamp and submission count
            const lastSubmissionTime = new Date(ipEntry.createdAt).getTime();
            const currentTime = Date.now();
            const timeDiffHours = Math.abs(currentTime - lastSubmissionTime) / (1000 * 60 * 60);

            if (timeDiffHours >= hours) {
                // More than 5 hours have passed, reset submission count
                await updateIP(ipEntry._id, clientIp, 1);
            } else if (ipEntry.submissions >= max_submits) {
                return res.redirect(301, `https://${site}#error`);
            } else {
                // Update timestamp and increment submission count for existing IP entry
                await updateIP(ipEntry._id, clientIp, ipEntry.submissions + 1);
            }
        } else {
            // IP does not exist, create new entry
            ipEntry = await createIP(clientIp, 1); // Start with 1 submission
        }

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: siteConfigs[site].emailAccount,
                pass: siteConfigs[site].emailPass,
            }
        });

        const mailOptions = {
            from: `${name} <${email}>`,
            to: siteConfigs[site].emailAccount,
            replyTo: email,
            subject: `${site}\n contact form submission`,
            text: `Site: ${site}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        if (siteConfigs[site]) {
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send('Error sending email: ' + error.toString());
                }
                res.redirect(301, `https://${site}#sent`);
            });
        } else {
            return res.status(422).send('Invalid form submission');
        }

    } catch (err) {
        console.error('Error processing form submission:', err);
        res.redirect(301, `https://${site}#error`);
    }
});

// Helper functions for NeDB operations
const findIP = async (ip) => {
    return new Promise((resolve, reject) => {
        db.findOne({ ip }, (err, doc) => {
            if (err) return reject(err);
            resolve(doc);
        });
    });
};

const createIP = async (ip, submissions) => {
    return new Promise((resolve, reject) => {
        db.insert({ ip, createdAt: new Date(), submissions }, (err, newDoc) => {
            if (err) return reject(err);
            resolve(newDoc);
        });
    });
};

const updateIP = async (id, ip, submissions) => {
    return new Promise((resolve, reject) => {
        db.update({ _id: id }, { $set: { createdAt: new Date(), submissions } }, {}, (err, numReplaced) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const getClientIp = (req) => {
    const ip = req.headers['x-forwarded-for'] ||
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress ||
        '';
    return ip.split(',')[0].trim();
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});