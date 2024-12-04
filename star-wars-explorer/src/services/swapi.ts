import axios from 'axios';
import { Character } from '../types';

const BASE_URL = 'https://swapi.dev/api/';

export const fetchData = async <T>(url: string): Promise<T> => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("API request failed:", error);
        throw new Error('Network response was not ok');
    }
};


export const getCharacters = async (page: number, searchTerm: string): Promise<{ results: Character[], count: number }> => {
    const url = `${BASE_URL}people/?page=${page}&search=${searchTerm}`;
    return await fetchData<{ results: Character[], count: number }>(url);
};

export const getCharacterDetails = async (id: number): Promise<Character> => {
    const url = `${BASE_URL}people/${id}/`;
    return await fetchData<Character>(url);
};


export const getHomeWorld = async (url: string, cache?: Map<string, string>) => {
    if (cache && cache.has(url)) {
        return cache.get(url);
    }

    const response = await axios.get(url);
    const planetName = response.data.name ? response.data.name:"-";

    cache && cache.set(url, planetName);
    return planetName;
};