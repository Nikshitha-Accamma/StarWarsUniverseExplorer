import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar } from '../../components/SearchBar';

describe('SearchBar Component', () => {
    const mockOnSearch = jest.fn();  

    it('should render the search input field with correct placeholder', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const inputElement = screen.getByPlaceholderText('Search characters');
        expect(inputElement).toBeInTheDocument();
    });

    it('should call the onSearch function when typing in the input field', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const inputElement = screen.getByPlaceholderText('Search characters');
        fireEvent.change(inputElement, { target: { value: 'Luke' } });
        expect(mockOnSearch).toHaveBeenCalledWith('Luke');
    });

    it('should not call onSearch until the user types', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('should call onSearch every time the input value changes', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const inputElement = screen.getByPlaceholderText('Search characters');
        fireEvent.change(inputElement, { target: { value: 'Luke' } });
        fireEvent.change(inputElement, { target: { value: 'Leia' } });

        expect(mockOnSearch).toHaveBeenCalledWith('Luke');
        expect(mockOnSearch).toHaveBeenCalledWith('Leia');
    });
});
