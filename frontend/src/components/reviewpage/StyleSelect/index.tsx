import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export default function StyleSelect () {
    const [style, setStyle] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStyle(event.target.value as string);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="style-select-label">風格</InputLabel>
                <Select
                    labelId="style-select-label"
                    id="style-select"
                    value={style}
                    onChange={handleChange}
                >
                    <MenuItem value={`寬鬆`}>寬鬆</MenuItem>
                    <MenuItem value={`合身`}>合身</MenuItem>
                    <MenuItem value={`緊身`}>緊身</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}