import React from 'react';
import { Character } from '../types';

interface CharacterDetailsProps {
    character: Character;
    starships: string[];
    films: string[];
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, films, starships }) => {
    return (
        <div>
            <h2>{character.name}</h2>
            <p>Gender: {character.gender}</p>
            <p>Hair Color: {character.hair_color}</p>
            <p>Eye Color: {character.eye_color}</p>
            <p>Height: {character.height}</p>
            <p>Homeworld: {character.homeworld}</p>
            <h3>Films:</h3>
            <ul>
                {films.map((film) => (
                    <li key={film}>{film}</li>
                ))}
            </ul>
            <h3>Starships:</h3>
            <ul>
                {starships.map((starship) => (
                    <li key={starship}>{starship}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetails;
