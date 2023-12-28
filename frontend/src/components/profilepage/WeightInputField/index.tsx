import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function WeightInputField () {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    type='number'
                    placeholder='Weight'
                />
            </FormControl>
        </Box>
    );
};