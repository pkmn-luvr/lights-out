import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cell from './Cell';


// Smoke test
describe('Cell', () => {
  test('renders without crashing', () => {
    const defaultProps = {
      isLit: true,
      flipCellsAroundMe: () => {} 
    };
    render(<Cell {...defaultProps} />);
  });
});

//Snapshot test
describe('Cell', () => {
    it('renders correctly', () => {
      const defaultProps = {
        isLit: true,
        flipCellsAroundMe: () => {}
      };
      const { asFragment } = render(<Cell {...defaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  