import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterDetails from '../../components/CharacterDetails';
import { Character } from '../../types';

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

const mockFilms = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'];
const mockStarships = ['X-Wing', 'Millennium Falcon'];

describe('CharacterDetails', () => {
    it('should render character details correctly', () => {
    render(<CharacterDetails character={mockCharacter} films={mockFilms} starships={mockStarships} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${mockCharacter.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Hair Color: ${mockCharacter.hair_color}`)).toBeInTheDocument();
    expect(screen.getByText(`Eye Color: ${mockCharacter.eye_color}`)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${mockCharacter.height}`)).toBeInTheDocument();
    expect(screen.getByText(`Homeworld: ${mockCharacter.homeworld}`)).toBeInTheDocument();
  });

  it('should render films list correctly', () => {
    render(<CharacterDetails character={mockCharacter} films={mockFilms} starships={mockStarships} />);

    expect(screen.getByText('Films:')).toBeInTheDocument();
    mockFilms.forEach((film) => {
      expect(screen.getByText(film)).toBeInTheDocument();
    });
  });

  it('should render starships list correctly', () => {
     render(<CharacterDetails character={mockCharacter} films={mockFilms} starships={mockStarships} />);

    expect(screen.getByText('Starships:')).toBeInTheDocument();
    mockStarships.forEach((starship) => {
      expect(screen.getByText(starship)).toBeInTheDocument();
    });
  });
});
