import React from 'react';
import { Box, Typography } from '@mui/material';

interface CheckedCounterBoxProps {
  count: number;
}

const CheckedCounterBox: React.FC<CheckedCounterBoxProps> = ({ count }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff7df',
        color: '#333333',
        padding: '18px 24px',
        width: '100%',
        mb: 3,
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.15rem',
          color: '#333333',
        }}
      >
        該当する項目は <span id="checkCount">{count}</span> 個
      </Typography>
    </Box>
  );
};

export default CheckedCounterBox;
