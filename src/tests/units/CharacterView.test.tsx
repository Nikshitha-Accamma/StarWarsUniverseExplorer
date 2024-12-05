import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterView from '../../components/CharacterView';
import { useFavourites } from '../../context/FavouritesContext';
import { Character } from '../../types';


jest.mock('../../context/FavouritesContext', () => ({
    useFavourites: jest.fn(),
}));

const mockAddToFavourites = jest.fn();
const mockRemoveFromFavourites = jest.fn();

const mockCharacter: Character = {
    name: 'Luke Skywalker',
    gender: 'male',
    hair_color: 'blond',
    eye_color: 'blue',
    height: '172',
    homeworld: 'Tatooine',
    films: ['abc', 'cde', 'few'],
    starships: ['rtg', 'hgg', 'bvn'],
    url: 'https://htp.com',
    id: 1
};

const mockHandleClick = jest.fn();

beforeEach(() => {
    (useFavourites as jest.Mock).mockReturnValue({
        favourites: [],
        addToFavourites: mockAddToFavourites,
        removeFromFavourites: mockRemoveFromFavourites,
    });
});

describe('CharacterView', () => {
    it('should render character details correctly', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${mockCharacter.gender}`)).toBeInTheDocument();
        expect(screen.getByText(`Homeworld: ${mockCharacter.homeworld}`)).toBeInTheDocument();
    });

    it('should render favourite button text correctly (Add to Favourites)', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);
        const favButton = screen.getAllByRole('button', { name: /add to favourites/i })[0];
        expect(favButton).toBeInTheDocument();
    });

    it('should render favourite button text correctly (Remove from Favourites)', () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [mockCharacter],
            addToFavourites: mockAddToFavourites,
            removeFromFavourites: mockRemoveFromFavourites,
        });

        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);
        const favButton = screen.getAllByRole('button', { name: /remove from favourites/i })[0];
        expect(favButton).toBeInTheDocument();
    });

    it('should call handleClick with correct character ID when card is clicked', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(mockHandleClick).toHaveBeenCalled();
    });

    it('should call addToFavourites when Add to Favourites button is clicked', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        const favButton = screen.getAllByRole('button', { name: /add to favourites/i })[0];
        fireEvent.click(favButton);
        expect(mockHandleClick).toHaveBeenCalled();
    });

    it('should call removeFromFavourites when Remove from Favourites button is clicked', () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [mockCharacter],
            addToFavourites: mockAddToFavourites,
            removeFromFavourites: mockRemoveFromFavourites,
        });

        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        const favButton = screen.getAllByRole('button', { name: /remove from favourites/i })[0];
        fireEvent.click(favButton);
        expect(mockHandleClick).toHaveBeenCalled();
    });
});
