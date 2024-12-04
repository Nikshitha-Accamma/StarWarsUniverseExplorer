import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { getCharacterIdFromTheUrl } from '../utils/helper';
import Header from '../components/Header';
import CharacterView from '../components/CharacterView';
import { Character } from '../types';
import { NoDataText, NoFavouritesText, PageWrapper, Title } from '../styles/FavoriteListPage.styles';
import { PATHS } from '../constants/path.constants';


const FavoritesListPage: React.FC = () => {
    const { favourites } = useFavourites();
    const [filteredFavorites, setFilteredFavorites] = useState<Character[]>(favourites);
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredFavorites(favourites)
    }, [favourites]);

    const handleCharacterClick = (id: number) => {
        navigate(`${PATHS.CHARACTER_LIST}/${id}`);
    };

    const handleSearch = (term: string) => {
        const filteredCharacters = favourites.filter((character: Character) =>
            character.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredFavorites(filteredCharacters);
    };

    return (
        <>
            <Grid item xs={12}>
                <Header onSearch={handleSearch} isSearchBarNeeded={true} />
            </Grid>
            <PageWrapper>
                <Title variant="h4">
                    Your Favourite Characters
                </Title>

                {favourites.length === 0 ? (
                    <NoFavouritesText variant="h6">
                        No favourites added yet.
                    </NoFavouritesText>
                ) : (
                    <>
                            {filteredFavorites.length === 0 && (
                                <NoDataText variant="h6">
                                No Data.
                            </NoDataText>
                        )}
                        <Grid container spacing={3}>
                            {filteredFavorites.map((character) => (
                                <CharacterView
                                    key={getCharacterIdFromTheUrl(character.url)}
                                    character={character}
                                    handleClick={() => handleCharacterClick(getCharacterIdFromTheUrl(character.url))}
                                />
                            ))}
                        </Grid>
                    </>
                )}
            </PageWrapper>
        </>
    );
};

export default FavoritesListPage;
