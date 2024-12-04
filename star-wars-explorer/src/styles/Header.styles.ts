import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
    backgroundColor: 'primary.main',
});

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

export const StyledTypography = styled(Typography)({
    flexGrow: 1,
});

export const StyledBox = styled(Box)({
    display: 'flex',
    gap: 3,
});

export const StyledButton = styled(Button)({
    textTransform: 'none',
});

export const StyledSearchBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});