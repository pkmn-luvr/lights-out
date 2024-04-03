import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Board from './Board';


describe('Board', () => {


    // Smoke test
    it('renders without crashing', () => {
        render(<Board />);
    });

    // Snapshot test
    it('renders the starter board with predictable configuration', () => {
      const initialBoard = [
        [true, false, true, false, true],
        [false, true, false, true, false],
        [true, false, true, false, true],
        [false, true, false, true, false],
        [true, false, true, false, true],
      ];    
      const { asFragment } = render(<Board nrows={5} ncols={5} initialBoard={initialBoard} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('shows "You won!" message when all cells are turned off', () => {
        const initialBoard = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ];
        const { getByText } = render(<Board nrows={5} ncols={5} initialBoard={initialBoard} />);
        expect(getByText("You Won!")).toBeInTheDocument();
      });

      test('clicking a cell flips the correct cells', async () => {
        const initialBoard = [
            [false, false, false, false, false],
            [false, false, true, false, false], 
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
          ];
          
          render(<Board nrows={5} ncols={5} initialBoard={initialBoard} />);
        
          //clicks the cell
          const cell = screen.getByTestId('cell-1-2'); 
        
          await userEvent.click(cell);
      
        // Checks  clicked cell and neighbors to ensure flipped
        expect(screen.getByTestId('cell-1-2')).not.toHaveClass('Cell-lit'); // clicked cell turns off
        expect(screen.getByTestId('cell-1-1')).toHaveClass('Cell-lit'); // L
        expect(screen.getByTestId('cell-1-3')).toHaveClass('Cell-lit'); // R
        expect(screen.getByTestId('cell-0-2')).toHaveClass('Cell-lit'); // Above
        expect(screen.getByTestId('cell-2-2')).toHaveClass('Cell-lit'); // Below
      
        // also checks cell that should not have flipped
        expect(screen.getByTestId('cell-0-0')).not.toHaveClass('Cell-lit');
    });
});