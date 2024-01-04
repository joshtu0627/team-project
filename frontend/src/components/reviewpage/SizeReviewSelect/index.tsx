import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

interface SizeReviewSelectProps {
    sizeReview: string;
    setSizeReview: React.Dispatch<React.SetStateAction<string>>;
}

const SizeReviewSelect: React.FC<SizeReviewSelectProps> = (props) => {
    const { sizeReview, setSizeReview } = props;

    const handleChange = (event: SelectChangeEvent) => {
        setSizeReview(event.target.value as string);
    }

    if (sizeReview === undefined || setSizeReview === undefined) return null;
    return (
        <Box sx={{ minWidth: 145 }}>
            <FormControl fullWidth sx={{ borderRadius: "20px", backgroundColor: "white"}}>
                <InputLabel id="size-review-select-label">尺寸</InputLabel>
                <Select
                    labelId="size-review-select-label"
                    id="size-review-select"
                    sx={{ borderRadius: "20px" }}
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

export default SizeReviewSelect;