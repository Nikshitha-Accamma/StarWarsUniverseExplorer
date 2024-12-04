import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import FavoritesListPage from '../../pages/FavoritesListPage';


jest.mock('../../context/FavouritesContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('FavoritesListPage', () => {
    beforeEach(() => {
        mockNavigate.mockReset();
        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: [],
        }));
    });

    it('should render "No favourites added yet" when no favourites exist', async () => {
        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: [],
        }));

        render(
            <MemoryRouter>
                <FavoritesListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('No favourites added yet.')).toBeInTheDocument();
    });

    it('should render "No Data" when search term does not match any favourites', async () => {
        const mockFavourites = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];

        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: mockFavourites,
        }));

        render(
            <MemoryRouter>
                <FavoritesListPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Han Solo' } });

        expect(screen.getByText('No Data.')).toBeInTheDocument();
    });

    it('should display characters when favourites exist', async () => {
        const mockFavourites = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];

        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: mockFavourites,
        }));

        render(
            <MemoryRouter>
                <FavoritesListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    it('should filter favourites based on search term', async () => {
        const mockFavourites = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];
                            
        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: mockFavourites,
        }));

        render(
            <MemoryRouter>
                <FavoritesListPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Luke' } });

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
    });

    it('should navigate to character detail page when a character is clicked', async () => {
        const mockFavourites = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        ];

        (useFavourites as jest.Mock).mockImplementation(() => ({
            favourites: mockFavourites,
        }));

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <FavoritesListPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Luke Skywalker'));
        expect(mockNavigate).toHaveBeenCalledWith('/character/1');
    });
});
