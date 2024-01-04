import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

interface StyleSelectProps {
    style: string;
    setStyle: React.Dispatch<React.SetStateAction<string>>;
}

const StyleSelect: React.FC<StyleSelectProps> = (props) => {
    const { style, setStyle } = props;
    const handleChange = (event: SelectChangeEvent) => {
        setStyle(event.target.value as string);
    }
    if (style === undefined || setStyle === undefined) return null;
    return (
        <Box sx={{ minWidth: 145 }}>
            <FormControl fullWidth sx={{ borderRadius: "20px", backgroundColor: "white"}}>
                <InputLabel id="style-select-label">風格</InputLabel>
                <Select
                    labelId="style-select-label"
                    id="style-select"
                    value={style}
                    onChange={handleChange}
                    sx={{ borderRadius: "20px" }}
                >
                    <MenuItem value={`寬鬆`}>寬鬆</MenuItem>
                    <MenuItem value={`合身`}>合身</MenuItem>
                    <MenuItem value={`緊身`}>緊身</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default StyleSelect;