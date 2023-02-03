import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  validationFields = () => {
    this.setState(({ email, password }) => {
      const six = 6;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const validationEmail = regex.test(email);
      const validationPassword = password.length >= six;
      if (validationEmail && validationPassword) {
        return {
          buttonDisabled: false,
        };
      }
      return {
        buttonDisabled: true,
      };
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validationFields();
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { buttonDisabled } = this.state;
    return (

      <div>

        <h1>Hello, TrybeWallet!</h1>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={ this.handleChange }
          data-testid="email-input"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={ this.handleChange }
          data-testid="password-input"
        />

        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);
