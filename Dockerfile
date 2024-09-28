# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY src/contact-form/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code
COPY src/contact-form/index.js ./

# Create a volume for the database file
VOLUME /usr/src/app/data

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]