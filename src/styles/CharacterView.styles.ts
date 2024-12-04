import { Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
});

export const StyledCard = styled(Card)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledCardContent = styled(CardContent)({
    flex: 1,
});

export const StyledButton = styled(Button)({
    marginTop: '10px',
});