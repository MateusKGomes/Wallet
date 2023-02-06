import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { coinRequest, finishEdit, priceRequest } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinRequest());
  }

  componentDidUpdate() {
    const { id } = this.state;
    const { editingInfos, editor } = this.props;
    if (editor && id !== editingInfos.id) {
      this.setState({ ...editingInfos });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  addExpense = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(priceRequest(this.state));
    this.setState({
      id: id + 1,
      description: '',
      value: '',
    });
  };

  editExpense = () => {
    const { dispatch } = this.props;
    dispatch(finishEdit(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor da despesa:
          <input
            type="text"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />

        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            value={ description }
            id="description"
            onChange={ this.handleChange }
            data-testid="description-input"
          />

        </label>
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            id="currency"
          >
            {
              currencies
                .map((coin) => (
                  <option key={ coin } value={ coin }>{ coin }</option>
                ))
            }
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            id="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ editor ? this.editExpense : this.addExpense }
        >

          {editor ? 'Editar despesa' : 'Adicionar Despesa '}
        </button>
        <div />
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  editingInfos: state.wallet.editingInfos,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.shape({
  }),
}.isRequired;

// WalletForm.defaultProps = {
//   editingExpenses: null,

// };

export default connect(mapStateToProps)(WalletForm);
