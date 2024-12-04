import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import CharacterListPage from './pages/CharacterListPage';
import theme from './theme';
import { FavouritesProvider } from './context/FavouritesContext';
import FavoritesListPage from './pages/FavoritesListPage';
import { PATHS } from './constants/path.constants';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <FavouritesProvider>
            <CssBaseline />
            <BrowserRouter>
                    <Routes>
                        <Route path={PATHS.HOME} element={<CharacterListPage />} />
                        <Route path={PATHS.CHARACTER_DETAIL} element={<CharacterDetailsPage />} />
                        <Route path={PATHS.FAVOURITES_LIST} element={<FavoritesListPage />} />
                </Routes>
                </BrowserRouter>
            </FavouritesProvider>
        </ThemeProvider>
    );
}

export default App;
