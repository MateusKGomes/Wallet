import { React } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe(' Teste o componente <App.js />', () => {
  test('Página inicial, título e inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const h1 = screen.getByRole('heading', { name: /hello, trybewallet!/i });
    expect(h1).toBeInTheDocument();
    const email = screen.getByRole('textbox');
    userEvent.type(email, 'test@test.com');
    const password = screen.getByPlaceholderText(/senha/i);
    userEvent.type(password, '12345');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  test('A rota carteira e suas funcionalidades', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expense = screen.getByRole('textbox', { name: /valor da despesa:/i });
    userEvent.type(expense, '10');
    const description = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    userEvent.type(description, 'marmitex');
    const currency = screen.getByTestId('currency-input');
    userEvent.click(currency);
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    expect(tag).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);
    await waitFor(() => {
      const deleteButton = screen.queryByRole('button', { name: /excluir/i });
      expect(deleteButton).toBeInTheDocument();
      const descriptionTable = screen.queryByRole('cell', { name: /marmitex/i });
      expect(descriptionTable).toBeInTheDocument();
      userEvent.click(deleteButton);
      expect(descriptionTable).not.toBeInTheDocument();
    });
  });
});
