import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => {
              const
                { description, method,
                  tag, value, currency, exchangeRates,
                } = expense;
              const valueNumber = Number(value);
              const cambio = exchangeRates[currency].ask;
              const convertedValue = valueNumber * cambio;
              const cambioNumber = Number(cambio);
              const coinName = exchangeRates[currency].name;
              return (
                <tr key={ index }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{valueNumber.toFixed(2)}</td>
                  <td>{coinName}</td>
                  <td>{cambioNumber.toFixed(2)}</td>
                  <td>{convertedValue.toFixed(2)}</td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>

                </tr>
              );
            })
          }

        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);
