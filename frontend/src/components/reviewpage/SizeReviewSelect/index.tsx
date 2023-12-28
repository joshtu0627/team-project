import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export default function SizeReviewSelect () {
    const [sizeReview, setSizeReview] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSizeReview(event.target.value as string);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="size-review-select-label">尺寸</InputLabel>
                <Select
                    labelId="size-review-select-label"
                    id="size-review-select"
                    value={sizeReview}
                    onChange={handleChange}
                >
                    <MenuItem value={`太大`}>太大</MenuItem>
                    <MenuItem value={`合適`}>合適</MenuItem>
                    <MenuItem value={`太小`}>太小</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}