
import { styled } from '@mui/system';
import { Button, TextField, Card, Grid } from '@mui/material';

export const ContentWrapper = styled('div')`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

export const StyledCard = styled(Card)`
    max-width: 500px;
    width: 100%;
`;

export const CenteredGrid = styled(Grid)`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    margin-top: 10px;
    background: red;
    color: white;
`;

export const StyledTextField = styled(TextField)`
    margin-bottom: 10px;
`;
