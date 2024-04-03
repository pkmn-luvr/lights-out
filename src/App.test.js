import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


describe('App', () => {
  // Smoke test
    test('renders without crashing', () => {
    render(<App />);
  });
  
  // Snapshot test
  it('renders correctly', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
