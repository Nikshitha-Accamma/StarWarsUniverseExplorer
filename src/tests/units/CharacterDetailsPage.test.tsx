import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import { fetchData, getCharacterDetails, getHomeWorld } from '../../services/swapi';
import CharacterDetailsPage from '../../pages/CharacterDetailsPage';


jest.mock('../../services/swapi');
jest.mock('../../context/FavouritesContext');

const mockAddToFavourites = jest.fn();
const mockRemoveFromFavourites = jest.fn();
const mockUpdateHeight = jest.fn();

const mockFavourites = [
    { id: 1, name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }
];

beforeEach(() => {
    (useFavourites as jest.Mock).mockReturnValue({
        favourites: mockFavourites,
        addToFavourites: mockAddToFavourites,
        removeFromFavourites: mockRemoveFromFavourites,
        updateHeight: mockUpdateHeight,
    });

    (getCharacterDetails as jest.Mock).mockResolvedValue({
        name: 'Luke Skywalker',
        height: '172',
        films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
        starships: ['https://swapi.dev/api/starships/10/', 'https://swapi.dev/api/starships/11/'],
        homeworld: 'https://swapi.dev/api/planets/1/',
        url: 'https://swapi.dev/api/people/1/'
    });

    (fetchData as jest.Mock).mockResolvedValue({ title: 'A New Hope', name: 'X-wing' });
    (getHomeWorld as jest.Mock).mockResolvedValue({ name: 'Tatooine' });
});

describe('CharacterDetailsPage', () => {
    it('should display loading indicator initially', () => {
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </MemoryRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render character details once fetched', async () => {
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </MemoryRouter>
        );

        await waitFor(() => screen.findByText('Luke Skywalker'));

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('172')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
        expect(screen.getByText('A New Hope')).toBeInTheDocument();
        expect(screen.getByText('X-wing')).toBeInTheDocument();
    });

    it('should toggle favourite button correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </MemoryRouter>
        );

        await waitFor(() => screen.findByText('Luke Skywalker'));

        const button = screen.getByRole('button', { name: 'Remove from Favourites' });
        fireEvent.click(button);

        expect(mockRemoveFromFavourites).toHaveBeenCalledWith(1);

        fireEvent.click(screen.getByRole('button', { name: 'Add to Favourites' }));
        expect(mockAddToFavourites).toHaveBeenCalledWith({
            id: 1,
            name: 'Luke Skywalker',
            height: '172',
            films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
            starships: ['https://swapi.dev/api/starships/10/', 'https://swapi.dev/api/starships/11/'],
            homeworld: 'Tatooine',
            url: 'https://swapi.dev/api/people/1/'
        });
    });

    it('should update height correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </MemoryRouter>
        );

        await waitFor(() => screen.findByText('Luke Skywalker'));

        const heightInput = screen.getByLabelText('Height');
        fireEvent.change(heightInput, { target: { value: '175' } });

        const updateButton = screen.getByRole('button', { name: 'Update Height' });
        fireEvent.click(updateButton);

        expect(mockUpdateHeight).toHaveBeenCalledWith(1, '175', expect.anything(), expect.anything());
    });
});