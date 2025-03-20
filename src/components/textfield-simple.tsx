import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { TextFieldInterface } from '@/interfaces/textFieldInterface';

const TextFieldSimple: React.FC<TextFieldInterface> = ({
  label,
  placeholder = '',
  type = 'text',
  value = '',
  maxLength = 999999,
  minValue,
  maxValue,
  mask,
  isUpperCase = false,
  isLabelSide = false,
  withIconSearch = false,
  onChange,
  onKeyUp,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (isUpperCase) newValue = newValue.toUpperCase();
    if (mask)
      newValue = newValue.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');

    if (minValue !== undefined && +newValue < minValue)
      setError(`The minimum value must be ${minValue}`);
    else if (maxValue !== undefined && +newValue > maxValue)
      setError(`The maximum value must be ${maxValue}`);
    else setError('');

    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyUp?.((event.target as HTMLInputElement).value);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
  };

  return (
    <Box>
      {isLabelSide ? (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">{label}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            type={type}
            value={inputValue}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            inputProps={{ maxLength }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {withIconSearch && (
                    <IconButton edge="end">
                      <Search />
                    </IconButton>
                  )}
                  {inputValue && (
                    <IconButton edge="end" onClick={handleClear}>
                      <Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ) : (
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          placeholder={placeholder}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          inputProps={{ maxLength }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {withIconSearch && (
                  <IconButton edge="end">
                    <Search />
                  </IconButton>
                )}
                {inputValue && (
                  <IconButton edge="end" onClick={handleClear}>
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TextFieldSimple;
