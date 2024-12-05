import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../components/Footer';

const mockOnPageChange = jest.fn();

describe('Footer Component', () => {
    it('should render Pagination with the correct number of pages', () => {
        render(<Footer totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

        const pagination = screen.getByRole('navigation');
        expect(pagination).toBeInTheDocument();

        expect(screen.getAllByRole('listitem')).toHaveLength(7); 
    });

    it('should display the correct current page', () => {
        render(<Footer totalPages={5} currentPage={3} onPageChange={mockOnPageChange} />);

        const currentPageButton = screen.getByText('3');
        expect(currentPageButton).toHaveClass('Mui-selected');
    });

    it('should call onPageChange when a new page is selected', () => {
        render(<Footer totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

        const pageButton = screen.getByText('4');
        fireEvent.click(pageButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 4);
    });

    it('should not allow selection of pages outside the available range', () => {
        render(<Footer totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

        const nonExistentPageButton = screen.queryByText('6');
        expect(nonExistentPageButton).toBeNull();
    });

    it('should correctly updates current page when a page change is triggered', () => {
        render(<Footer totalPages={5} currentPage={2} onPageChange={mockOnPageChange} />);

        expect(screen.getByText('2')).toHaveClass('Mui-selected');

        const pageButton = screen.getByText('4');
        fireEvent.click(pageButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 4);
    });
});
