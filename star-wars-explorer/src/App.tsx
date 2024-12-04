import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import CharacterListPage from './pages/CharacterListPage';
import theme from './theme';
import { FavouritesProvider } from './context/FavouritesContext';
import FavoritesListPage from './pages/FavoritesListPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <FavouritesProvider>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CharacterListPage />} />
                    <Route path="/character/:id" element={<CharacterDetailsPage />} />
                    <Route path="/favorites" element={<FavoritesListPage />} />
                </Routes>
                </BrowserRouter>
            </FavouritesProvider>
        </ThemeProvider>
    );
}

export default App;
