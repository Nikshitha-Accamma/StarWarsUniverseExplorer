import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import CharacterListPage from '../../pages/CharacterListPage';

jest.mock('../../hooks/useCharacters');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockFetchCharacters = jest.fn();

describe('CharacterListPage', () => {
    beforeEach(() => {
        mockFetchCharacters.mockReset();
        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: [],
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));
    });

    it('should render loading spinner when data is loading', async () => {
        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: [],
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: true,
            setCharacters: jest.fn(),
        }));

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render "No Data" when no characters are available', async () => {
        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('No Data')).toBeInTheDocument();
    });

    it('should display characters when data is available', async () => {
        const mockCharacters = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];

        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: mockCharacters,
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    it('should call fetchCharacters when page or search term changes', async () => {
        const mockCharacters = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        ];

        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: mockCharacters,
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Luke' } });
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockFetchCharacters).toHaveBeenCalledWith(1, 'Luke');
    });

    test('should navigate to character details when character is clicked', async () => {
        const mockCharacters = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        ];

        const mockNavigate = jest.fn();
        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: mockCharacters,
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Luke Skywalker'));

        expect(mockNavigate).toHaveBeenCalledWith('/character/1');
    });

    it('should display pagination footer', async () => {
        const mockCharacters = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];

        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: mockCharacters,
            totalPages: 2,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    it('should filter characters based on search term', async () => {
        const mockCharacters = [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ];

        (useCharacters as jest.Mock).mockImplementation(() => ({
            characters: mockCharacters,
            totalPages: 1,
            fetchCharacters: mockFetchCharacters,
            isLoading: false,
            setCharacters: jest.fn(),
        }));

        render(
            <MemoryRouter>
                <CharacterListPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Luke' } });

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
    });
});
