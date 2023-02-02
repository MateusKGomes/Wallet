import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinRequest from '../redux/actions';

class WalletForm extends Component {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinRequest(this.state));
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="totalvalue">
          Valor da despesa:
          <input
            type="text"
            name="totalValue"
            id="totalValue"
            data-testid="value-input"
          />

        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
          />

        </label>
        <select
          data-testid="currency-input"
        >
          {
            currencies
              .map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))
          }
        </select>
        <select
          data-testid="method-input"
        >
          <option value="money">Dinheiro</option>
          <option value="credit-card">Cartão de crédito</option>
          <option value="debit-card">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="job">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>

        </select>
      </div>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
