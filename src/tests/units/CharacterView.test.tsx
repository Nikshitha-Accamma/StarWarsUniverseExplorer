import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterView from '../../components/CharacterView';
import { useFavourites } from '../../context/FavouritesContext';
import { Character } from '../../types';


jest.mock('../context/FavouritesContext', () => ({
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
        const favButton = screen.getByRole('button', { name: /add to favourites/i });
        expect(favButton).toBeInTheDocument();
    });

    it('should render favourite button text correctly (Remove from Favourites)', () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [mockCharacter],
            addToFavourites: mockAddToFavourites,
            removeFromFavourites: mockRemoveFromFavourites,
        });

        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);
        const favButton = screen.getByRole('button', { name: /remove from favourites/i });
        expect(favButton).toBeInTheDocument();
    });

    it('should call handleClick with correct character ID when card is clicked', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        fireEvent.click(screen.getByRole('button'));
        expect(mockHandleClick).toHaveBeenCalledWith(1);
    });

    it('should call addToFavourites when Add to Favourites button is clicked', () => {
        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        const favButton = screen.getByRole('button', { name: /add to favourites/i });
        fireEvent.click(favButton);

        expect(mockAddToFavourites).toHaveBeenCalledWith(mockCharacter);
    });

    it('should call removeFromFavourites when Remove from Favourites button is clicked', () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [mockCharacter],
            addToFavourites: mockAddToFavourites,
            removeFromFavourites: mockRemoveFromFavourites,
        });

        render(<CharacterView character={mockCharacter} handleClick={mockHandleClick} />);

        const favButton = screen.getByRole('button', { name: /remove from favourites/i });
        fireEvent.click(favButton);
        expect(mockRemoveFromFavourites).toHaveBeenCalledWith(1);
    });
});
