import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

interface WeightInputFieldProps {
    weight: number;
    setWeight: React.Dispatch<React.SetStateAction<number>>;

}

const WeightInputField: React.FC<WeightInputFieldProps> = (props) => {
    const { weight, setWeight } = props;
    if (weight === undefined || setWeight === undefined) return null;
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '145px' },

            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{  width: '145px', backgroundColor: 'white', borderRadius: '20px' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">公斤</InputAdornment>}
                    type='number'
                    placeholder='體重'
                    sx={{ borderRadius: '20px' }}
                    onChange={(event) => {
                        setWeight(parseFloat(event.target.value));
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default WeightInputField;