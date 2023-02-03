import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumAllExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, cur) => {
      const value = cur.value * cur.exchangeRates[cur.currency].ask;
      const newValue = Number(value) + parseFloat(acc);
      return newValue.toFixed(2);
    }, 0);
    return total;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.sumAllExpenses()}</p>
        <p data-testid="header-currency-field"> BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
