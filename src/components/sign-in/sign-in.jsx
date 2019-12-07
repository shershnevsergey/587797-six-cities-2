import React from 'react';
import PropTypes from 'prop-types';
import {Operation} from "../../reducer";
import {connect} from "react-redux";
import history from "../../history";
import {Redirect} from 'react-router-dom';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this._onSignInButtonClick = this._onSignInButtonClick.bind(this);
  }

  render() {
    const {
      email,
      password,
      onInputKeydown,
      isAuth
    } = this.props;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    return <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" defaultValue={email} onChange={onInputKeydown}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" defaultValue={password} onChange={onInputKeydown}/>
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={this._onSignInButtonClick}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>;
  }

  _onSignInButtonClick(evt) {
    evt.preventDefault();

    const {
      email,
      password,
      authorize
    } = this.props;

    if (email.length === 0) {
      throw new Error(`Email is empty`);
    } else if (password.length === 0) {
      throw new Error(`Password is empty`);
    }

    authorize(email, password);
    history.push(`/`);
  }
}

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onInputKeydown: PropTypes.func.isRequired,
  authorize: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuth: state.authData.email !== undefined
});

const mapDispatchToProps = (dispatch) => ({
  authorize: (email, password) => dispatch(Operation.authorize(email, password))
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
