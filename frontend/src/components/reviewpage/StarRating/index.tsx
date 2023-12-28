import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function StarRating () {
    return (
        <Stack spacing={1}>
            <Rating name="size-medium" defaultValue={0} />
        </Stack>
    )
};