import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAfterClick, startEditing } from '../redux/actions';

class Table extends Component {
  handleDeleteClick = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const deleteItemById = expenses.filter((expense) => expense.id !== Number(target.id));
    dispatch(deleteAfterClick(deleteItemById));
  };

  startEditing = (param) => {
    const { dispatch } = this.props;
    dispatch(startEditing(param));
  };

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
        {
          expenses.map((expense) => {
            const
              { id, description, method,
                tag, value, currency, exchangeRates,
              } = expense;
            const valueNumber = Number(value);
            const cambio = exchangeRates[currency].ask;
            const convertedValue = valueNumber * cambio;
            const cambioNumber = Number(cambio);
            const coinName = exchangeRates[currency].name;
            return (
              <tbody key={ id }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{valueNumber.toFixed(2)}</td>
                  <td>{coinName}</td>
                  <td>{cambioNumber.toFixed(2)}</td>
                  <td>{convertedValue.toFixed(2)}</td>
                  <td>Real</td>

                  <td>
                    <button
                      type="button"
                      id={ id }
                      data-testid="delete-btn"
                      onClick={ this.handleDeleteClick }
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      id={ id }
                      data-testid="edit-btn"
                      onClick={ () => this.startEditing(expense) }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        }
      </table>

    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});
export default connect(mapStateToProps)(Table);
