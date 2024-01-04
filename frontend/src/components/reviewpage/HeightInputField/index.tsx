import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import WeightInputField from '../WeightInputField';

interface HeightInputFieldProps {
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
};

const HeightInputField: React.FC<HeightInputFieldProps> = (props) => {
    const { height, setHeight } = props;
    if (height === undefined || setHeight === undefined) return null;
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '145px' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{ width: '145px', 'backgroundColor': 'white', borderRadius: "20px" }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-height"
                    endAdornment={<InputAdornment position="end">公分</InputAdornment>}
                    type='number'
                    placeholder='身高'
                    sx={{ borderRadius: "20px" }}
                    onChange={(event) => {
                        setHeight(parseFloat(event.target.value));
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default HeightInputField;