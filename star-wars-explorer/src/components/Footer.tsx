import React from 'react';
import { Pagination } from '@mui/material';  
import { FooterContainer } from '../styles/Footer.styles';

interface FooterProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const Footer: React.FC<FooterProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <FooterContainer item xs={12}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
            />
        </FooterContainer>
    );
};

export default Footer;
