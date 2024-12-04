import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress } from '@mui/material';
import { useCharacters } from '../hooks/useCharacters';
import { getCharacterIdFromTheUrl } from '../utils/helper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CharacterView from '../components/CharacterView';
import { Character } from '../types';
import { LoadingContainer, NoData, Wrapper } from '../styles/CharacterListPage.styles';
import { PATHS } from '../constants/path.constants';

const CharacterListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { characters, totalPages, fetchCharacters, isLoading, setCharacters } = useCharacters(page, searchTerm);
    const navigate = useNavigate();

    const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filteredCharacters = characters.filter((character: Character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCharacters(filteredCharacters);
    };

    const handleCharacterClick = (id: number) => {
        navigate(`${PATHS.CHARACTER_LIST}/${id}`);
    };

    useEffect(() => {
        fetchCharacters(page, searchTerm);
    }, [page, searchTerm, fetchCharacters]);

    return (
        <>
            <Grid item xs={12}>
                <Header onSearch={handleSearch} isSearchBarNeeded={true} />
            </Grid>
            <Wrapper>
                <Grid item xs={12}>
                    {isLoading ? (
                        <LoadingContainer>
                            <CircularProgress size={60} color="primary" />
                        </LoadingContainer>
                    ) : (
                            <>
                                {characters.length === 0 && <NoData>No Data</NoData>}
                            <Grid container spacing={3} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                                {characters.map((character) => (
                                    <CharacterView
                                        key={getCharacterIdFromTheUrl(character.url)}
                                        character={character}
                                        handleClick={() => handleCharacterClick(getCharacterIdFromTheUrl(character.url))}
                                    />
                                ))}
                            </Grid>
                        </>
                    )}
                </Grid>

                {!isLoading && characters.length > 0 && (
                    <Grid item xs={12}>
                        <Footer
                            totalPages={totalPages}
                            currentPage={page}
                            onPageChange={handleChangePage}
                        />
                    </Grid>
                )}
            </Wrapper>
        </>
    );
};

export default CharacterListPage;
