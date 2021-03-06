import React from 'react';
import jsonp from 'jsonp';
import { setCookie, isValidEmail, SiteConf } from 'base';

import styles from './styles.css';

class PostRegister extends React.Component {

  state = { status: 'register' };

  handleSubmit(env) {
    env.preventDefault();
    const path = `${SiteConf.mailListUrl}&EMAIL=${encodeURIComponent(this.state.email)}`;
    const url = path.replace('/post?', '/post-json?');
    (!isValidEmail(this.state.email)) ? this.setState({ status: "invalid" }) : this.registerEmail(url);
  };

  registerEmail(url) {
    this.setState({ status: 'sending' });
    jsonp(url, { param: 'c' }, (err, data) => {
      if (data.msg.includes('already subscribed')) {
        this.setState({ status: 'duplicate' });
      } else if (err) {
        this.setState({ status: 'error' });
      } else if (data.result !== 'success') {
        this.setState({ status: 'error' });
      } else {
        const { email } = this.state;
        this.setState({ status: 'success' });
        setCookie(SiteConf.cookieMailSubscription, email, 300);
      }
    });
  }

  render() {
    const { status } = this.state;
    return (
      <div className={styles.RegisterBoxWrap}>
        <div className={styles.txt}>
          {status === 'register' && <span>¿Quieres recibir posts como este en tu email?</span>}
          {status === 'success' && <span>Gracias.</span>}
          {status === 'sending' && <span>Enviando...</span>}
          {status === 'duplicate' && <span>Ya esta dado de alta.</span>}
          {status === 'error' && <span>Se produjo un error.</span>}
          {status === 'invalid' && <span>El email no parece correcto.</span>}
        </div>
        <form className={styles.registerForm} >
          <div className={styles.registerFormContent}>
            <input
              placeholder="Introduce tu email"
              type="email"
              key="email"
              required={true}
              onChange={({ target }) => this.setState({ email: target.value })}
              className={styles.inputField} />
            <button
              type="button"
              role="button"
              className={styles.inputButton}
              onClick={(env) => this.handleSubmit(env)}
            >
              Subscribirse
            </button>
          </div>
        </form>
      </div>);
  }
}

export default PostRegister;