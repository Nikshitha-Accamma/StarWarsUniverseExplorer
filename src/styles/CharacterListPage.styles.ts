import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const Wrapper = styled('div')`
    padding: 20px;
`;

export const LoadingContainer = styled(Grid)`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NoData = styled('div')`
    text-align: center;
    font-size: 16px;
    color: #757575;
`;