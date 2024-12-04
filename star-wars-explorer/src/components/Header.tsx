import React from 'react';
import {  TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledAppBar, StyledBox, StyledSearchBox, StyledToolbar, StyledTypography, StyledButton } from '../styles/Header.styles';
import { PATHS } from '../constants/path.constants';
interface HeaderProps {
    onSearch?: (term: string) => void;
    isSearchBarNeeded: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isSearchBarNeeded }) => {
    const navigate = useNavigate();

    const handleSearch = (term: string) => {
        if (onSearch) {
            onSearch(term);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <StyledAppBar position="sticky">
            <StyledToolbar>
                <StyledTypography variant="h6">
                    Star Wars Explorer
                </StyledTypography>
                <StyledBox>
                    <StyledButton color="inherit" onClick={() => handleNavigation(PATHS.HOME)}>
                        Home
                    </StyledButton>
                    <StyledButton color="inherit" onClick={() => handleNavigation(PATHS.FAVOURITES_LIST)}>
                        Favorites
                    </StyledButton>
                </StyledBox>

                {isSearchBarNeeded && (
                    <StyledSearchBox>
                        <TextField
                            variant="outlined"
                            placeholder="Search Character"
                            onChange={(e) => handleSearch(e.target.value)}
                            size="small"
                        />
                    </StyledSearchBox>
                )}
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;
