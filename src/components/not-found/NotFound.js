import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const NotFound = ({ message = "We couldn't find what you're looking for" }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(15deg, #ffff, #111, #ffff)',
        boxShadow: '0 0 25px rgba(0,255,163,0.2)',
        '&:hover': {
          boxShadow: '0 0 35px rgba(99,241,249,0.5)',
        },
      }}
    >
      <BlurOnIcon sx={{ fontSize: 64, color: '#63f1f9', mb: 2 }} />
      <Typography
        variant="h5"
        sx={{
          color: '#63f1f9',
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {message}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'secondary.light',
          mb: 3,
          textAlign: 'center',
        }}
      >
        Try adjusting your search or filter to find what you're looking for
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push('/donates')}
        sx={{
          background: 'linear-gradient(to right, #63f1f9, #72F088)',
          color: '#000',
          fontWeight: 'bold',
          px: 4,
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: '0 0 20px #63f1f9',
          '&:hover': {
            background: 'linear-gradient(to right, #72F088, #63f1f9)',
          },
        }}
      >
        Explore All Campaigns
      </Button>
    </Box>
  );
};

export default NotFound; 