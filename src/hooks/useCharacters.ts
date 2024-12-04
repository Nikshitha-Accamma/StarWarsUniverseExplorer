import { useState, useCallback } from 'react';
import { getCharacters, getHomeWorld } from '../services/swapi';
import { Character } from '../types';
import { NumberOfItemsPerPage } from '../constants/global.constants';

export const useCharacters = (page: number, searchTerm: string) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCharacters = useCallback(async (page: number, searchTerm: string) => {
        try {
            setIsLoading(true);
            const data = await getCharacters(page, searchTerm);
            const homeworldCache = new Map<string, string>();
            const charactersWithHomeworlds = await Promise.all(data.results.map(async (character: Character) => {
                const homeworld = await getHomeWorld(character.homeworld, homeworldCache);
                return { ...character, homeworld };
            }));
            setCharacters(charactersWithHomeworlds);
            setTotalPages(Math.ceil(data.count / NumberOfItemsPerPage));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    }, []);

    return { characters, totalPages, fetchCharacters, isLoading, setCharacters };
};
