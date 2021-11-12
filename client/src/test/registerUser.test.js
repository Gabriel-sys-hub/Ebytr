import React from 'react';
import Register from '../pages/Register';
import renderWithRouter from './renderWithRouter';

describe('Register', () => {
  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register/>);
    const email = getByPlaceholderText("Email");

    expect(email.placeholder).toBe('Email')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register/>);

    const password = getByPlaceholderText("Password");

    expect(password.placeholder).toBe('Password')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register/>);

    const password = getByPlaceholderText("Repeat Password");

    expect(password.placeholder).toBe('Repeat Password')
  });
});