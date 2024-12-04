import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useFavourites } from '../context/FavouritesContext';
import { getCharacterIdFromTheUrl } from '../utils/helper';
import { Character } from '../types';
import { StyledGrid, StyledCard, StyledCardContent, StyledButton } from '../styles/CharacterView.styles';


interface CharacterViewProps {
    character: Character;
    handleClick: (id: number) => void;
}

const CharacterView: React.FC<CharacterViewProps> = ({ character, handleClick }) => {
    const { favourites, addToFavourites, removeFromFavourites } = useFavourites();
    const isFavourite = favourites.some(fav => getCharacterIdFromTheUrl(fav.url) === getCharacterIdFromTheUrl(character.url));

    const handleFavouriteToggle = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (isFavourite) {
            removeFromFavourites(getCharacterIdFromTheUrl(character.url)); 
        } else {
            addToFavourites(character); 
        }
    };

    return (
        <StyledGrid item xs={12} sm={6} md={4} lg={3}>
            <StyledCard>
                <StyledCardContent>
                    <Card>
                        <CardActionArea onClick={() => handleClick(getCharacterIdFromTheUrl(character.url))}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {character.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gender: {character.gender}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Homeworld: {character.homeworld}
                                </Typography>
                                <StyledButton
                                    onClick={handleFavouriteToggle}
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                >
                                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                                </StyledButton>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </StyledCardContent>
            </StyledCard>
        </StyledGrid>
    );
};

export default CharacterView;