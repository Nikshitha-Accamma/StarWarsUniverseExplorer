import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Character, FavouritesContextType } from '../types';
import { getCharacterIdFromTheUrl } from '../utils/helper';

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<Character[]>(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (character: Character) => {
        setFavourites((prev) => [...prev, character]);
    };

    const removeFromFavourites = (id: number) => {
        setFavourites((prev) => prev.filter((fav) => getCharacterIdFromTheUrl(fav.url) !== id));
    };

    const updateHeight = (id: number, height: string, character: Character, setCharacter: (character: Character)=>void ) => {
        setFavourites((prev) =>
            prev.map((fav) =>
                getCharacterIdFromTheUrl(fav.url) === id ? { ...fav, height } : fav
            )
        );
        setCharacter({ ...character, height });
    };

    return (
        <FavouritesContext.Provider
            value={{ favourites, addToFavourites, removeFromFavourites, updateHeight, setFavourites }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};
