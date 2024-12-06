import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';


const mockNavigate = jest.fn();
const mockOnSearch = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));
console.log("Header", <Header onSearch={mockOnSearch} isSearchBarNeeded={true}/>)
describe('Header Component', () => {
    it('should render the header with navigation buttons', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={true} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Favorites')).toBeInTheDocument();
    });

    it('should navigate to the home page when "Home" button is clicked', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={true} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Home'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should navigate to the favorites page when "Favorites" button is clicked', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={true} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Favorites'));
        expect(mockNavigate).toHaveBeenCalledWith('/favorites');
    });

    it('should call the onSearch function when typing in the search bar', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={true} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search Character');
        fireEvent.change(searchInput, { target: { value: 'Luke' } });
        expect(mockOnSearch).toHaveBeenCalledWith('Luke');
    });

    it('should not render the search bar when isSearchBarNeeded is false', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={false} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByPlaceholderText('Search Character')).toBeNull();
    });

    it('should render the search bar when isSearchBarNeeded is true', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route>
                        <Header onSearch={mockOnSearch} isSearchBarNeeded={true} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Search Character')).toBeInTheDocument();
    });
});
