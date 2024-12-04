import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, CardContent, Grid, CircularProgress } from '@mui/material';
import { useFavourites } from '../context/FavouritesContext';
import { getCharacterIdFromTheUrl } from '../utils/helper';
import { fetchData, getCharacterDetails, getHomeWorld } from '../services/swapi';
import CharacterDetails from '../components/CharacterDetails';
import Header from '../components/Header';
import { Character } from '../types';
import { CenteredGrid, ContentWrapper, StyledButton, StyledCard, StyledTextField } from '../styles/CharaterDetailsPage.styles';

interface CharacterDetailsType extends Character {
    id: number;
}

const CharacterDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<CharacterDetailsType | null>(null);
    const { favourites, addToFavourites, removeFromFavourites, updateHeight } = useFavourites();
    const [height, setHeight] = useState('');
    const [films, setFilms] = useState<string[]>([]);
    const [starships, setStarships] = useState<string[]>([]);

    useEffect(() => {
        fetchCharacterDetails(id || '');
    }, [id]);

    const fetchFilmsAndStarships = async (filmUrls: string[], starshipUrls: string[]) => {
        try {
            const filmNames = await Promise.all(filmUrls.map((url: string) => fetchData(url)));
            const starshipNames = await Promise.all(starshipUrls.map((url: string) => fetchData(url)));
            setFilms(filmNames.map((film) => (film as { title?: string }).title || 'Unknown Film'));
            setStarships(starshipNames.map((starship) => (starship as { name?: string }).name || 'Unknown Starship'));
        } catch (error) {
            console.error("Error fetching films and starships:", error);
        }
    };

    const fetchCharacterDetails = async (id: string) => {
        try {
            const data = await getCharacterDetails(Number(id));
            const characterId = getCharacterIdFromTheUrl(data.url);
            const homeworld = await getHomeWorld(data.homeworld);
            setCharacter({ ...data, id: characterId, homeworld });
            setHeight(data.height);
            await fetchFilmsAndStarships(data.films, data.starships);
        } catch (error) {
            console.error("Error fetching character details:", error);
        }
    };

    const handleToggleFavourite = () => {
        if (character) {
            const isFavourite = favourites.some(
                (fav) => getCharacterIdFromTheUrl(fav.url) === character.id
            );

            if (isFavourite) {
                removeFromFavourites(character.id);
            } else {
                addToFavourites(character);
            }
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(e.target.value);
    };

    const handleHeightSubmit = () => {
        if (character) {
            updateHeight(character.id, height, character, setCharacter);
        }
    };

    if (!character) return (
        <CenteredGrid>
            <CircularProgress size={60} color="primary" />
        </CenteredGrid>
    );

    const isFavourite = favourites.some(
        (fav) => getCharacterIdFromTheUrl(fav.url) === character.id
    );

    return (
        <>
            <Header isSearchBarNeeded={false} />
            <ContentWrapper>
                <StyledCard>
                    <CardContent>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <CharacterDetails character={character} films={films} starships={starships} />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <StyledButton
                                    onClick={handleToggleFavourite}
                                    variant="contained"
                                >
                                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                                </StyledButton>
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <StyledTextField
                                    label="Height"
                                    value={height}
                                    onChange={handleHeightChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    onClick={handleHeightSubmit}
                                    variant="contained"
                                    color="primary"
                                >
                                    Update Height
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </StyledCard>
            </ContentWrapper>
        </>
    );
};

export default CharacterDetailsPage;
