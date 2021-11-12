import React from 'react';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login', () => {

  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, { route: '/' });

    const email = getByPlaceholderText("Email");

    expect(email.placeholder).toBe('Email')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, { route: '/' });

    const password = getByPlaceholderText("Senha");

    expect(password.placeholder).toBe('Senha')
  });

  it('Quando abrir pagina de login o botão "Login" exista na tela', () => {
    const { getByRole } = renderWithRouter(<App/>, { route: '/' });

    const button = getByRole('button', {name: /login/i});

    expect(button).toBeInTheDocument('Login');
  });
});

