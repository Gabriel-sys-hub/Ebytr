import React from 'react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login', () => {

  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login/>);

    const password = getByPlaceholderText("Email");

    expect(password.placeholder).toBe('Email')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login/>);

    const password = getByPlaceholderText("Senha");

    expect(password.placeholder).toBe('Senha')
  });
});

describe('Register', () => {
  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register />);

    const email = getByPlaceholderText("Email");

    expect(email.placeholder).toBe('Email')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register />);

    const password = getByPlaceholderText("Password");

    expect(password.placeholder).toBe('Password')
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<Register />);

    const password = getByPlaceholderText("Repeat Password");

    expect(password.placeholder).toBe('Repeat Password')
  });
});
