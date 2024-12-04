export interface Film {
    title: string;
    release_date: string;
    url: string;
}

export interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    url: string;
}

export interface Character {
    name: string;
    height: string;
    gender: string;
    hair_color: string;
    eye_color: string;
    homeworld: string;
    films: string[];
    starships: string[];
    url: string;
    id: number;
}
export interface FavouritesContextType {
    favourites: Character[];
    addToFavourites: (character: Character) => void;
    removeFromFavourites: (id: number) => void;
    updateHeight: (id: number, newHeight: string, character: Character, setCharacter: (character: Character) => void) => void;
    setFavourites: (characters: Character[]) => void;
}

export interface CharacterContextType {
    selectedCharacter: Character | null;
    setSelectedCharacter: (character: Character) => void;
}