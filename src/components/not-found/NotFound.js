import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import HexagonIcon from '@mui/icons-material/Hexagon';
import WavesIcon from '@mui/icons-material/Waves';

const NotFound = ({ message = "We couldn't find what you're looking for" }) => {
  const router = useRouter();

  return (
    <Box
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '500px',
        p: 6,
        borderRadius: 6,
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,249,255,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(99, 241, 249, 0.2)',
        boxShadow: '0 20px 80px -20px rgba(99, 241, 249, 0.25)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          backgroundSize: '200% 100%',
          animation: 'gradientFlow 3s linear infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '-100%',
          width: '300%',
          height: '240px',
          backgroundImage: 'radial-gradient(circle, rgba(99, 241, 249, 0.1) 10%, transparent 10.5%)',
          backgroundSize: '20px 20px',
          transform: 'rotate(-5deg)',
          zIndex: 0,
        },
      }}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes pulse {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.8; transform: scale(1); }
          }
          @keyframes orbitLeft {
            0% { transform: translateX(0) translateY(0) scale(0.8); }
            50% { transform: translateX(-70px) translateY(-20px) scale(1); }
            100% { transform: translateX(0) translateY(0) scale(0.8); }
          }
          @keyframes orbitRight {
            0% { transform: translateX(0) translateY(0) scale(0.9); }
            50% { transform: translateX(70px) translateY(-30px) scale(1.1); }
            100% { transform: translateX(0) translateY(0) scale(0.9); }
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes shineText {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          animation: 'orbitLeft 15s ease-in-out infinite',
          zIndex: 0,
          opacity: 0.7,
        }}
      >
        <HexagonIcon 
          sx={{ 
            fontSize: 40, 
            color: '#72F088',
            filter: 'drop-shadow(0 0 8px rgba(114, 240, 136, 0.5))',
          }} 
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          animation: 'orbitRight 12s ease-in-out infinite',
          zIndex: 0,
          opacity: 0.7,
        }}
      >
        <HexagonIcon 
          sx={{ 
            fontSize: 30, 
            color: '#63f1f9',
            filter: 'drop-shadow(0 0 8px rgba(99, 241, 249, 0.5))',
          }} 
        />
      </Box>
      
      {/* Main icon */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          animation: 'float 6s ease-in-out infinite',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(99, 241, 249, 0.15) 0%, rgba(114, 240, 136, 0.15) 100%)',
            boxShadow: '0 10px 30px rgba(99, 241, 249, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.5)',
            animation: 'pulse 4s ease-in-out infinite',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              borderRadius: '50%',
              opacity: 0.2,
              filter: 'blur(15px)',
              animation: 'pulse 4s ease-in-out infinite 0.5s',
            }
          }}
        >
          <WavesIcon 
            sx={{ 
              fontSize: 80, 
              color: '#63f1f9',
              filter: 'drop-shadow(0 0 15px rgba(99, 241, 249, 0.7))',
            }} 
          />
        </Box>
      </Box>
      
      <Typography
        variant="h4"
        sx={{
          color: '#333',
          mb: 2.5,
          textAlign: 'center',
          fontWeight: 800,
          position: 'relative',
          zIndex: 1,
          animation: 'fadeIn 1s ease-out',
          background: 'linear-gradient(90deg, #333, #63f1f9, #72F088, #333)',
          backgroundSize: '300% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shineText 8s linear infinite',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #63f1f9, #72F088)',
            borderRadius: '3px',
          }
        }}
      >
        {message}
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          color: '#666',
          mb: 5,
          textAlign: 'center',
          fontWeight: 400,
          maxWidth: '600px',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          animation: 'fadeIn 1s ease-out forwards 0.3s',
        }}
      >
        The page you're looking for might have been moved or doesn't exist
      </Typography>
    </Box>
  );
};

export default NotFound; 