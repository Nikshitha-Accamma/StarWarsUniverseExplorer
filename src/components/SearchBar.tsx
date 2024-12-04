import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search characters"
            onChange={handleChange}
        />
    );
};
