// ErrorPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from './Error';

// Mockear LogOutButton ya que no lo estamos probando específicamente en este test
jest.mock('../elements/global/LogOutButton', () => ({
  LogOutButton: () => <button>Mocked LogOutButton</button>,
}));

describe('ErrorPage Component', () => {
  test('Renderizar mensaje de error y botón de logout', () => {
    render(<ErrorPage />);

   
  });
});
