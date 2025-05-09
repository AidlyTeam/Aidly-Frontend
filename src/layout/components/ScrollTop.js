import { hexToRGBA } from "@/utils/hex-to-rgba";
import { NorthRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";

const ScrollTop = () => {
  const arrow = useRef();

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset >= 200) {
        if (arrow.current) arrow.current.style.opacity = 1;
      } else {
        if (arrow.current) arrow.current.style.opacity = 0;
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 5px #63f1f9, 0 0 10px #63f1f9, 0 0 15px #63f1f9; }
            50% { box-shadow: 0 0 10px #63f1f9, 0 0 20px #63f1f9, 0 0 30px #63f1f9; }
            100% { box-shadow: 0 0 5px #63f1f9, 0 0 10px #63f1f9, 0 0 15px #63f1f9; }
          }
        `}
      </style>
      <Button
        ref={arrow}
        onClick={scrollToTop}
        aria-label="scroll to top"
        sx={{
          opacity: 0,
          position: 'fixed',
          transitionDuration: '500ms',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '50%',
          bottom: '2rem',
          right: '2rem',
          p: '0',
          zIndex: 99,
          height: '50px',
          minWidth: '50px',
          width: '50px !important',
          background: 'linear-gradient(135deg, #63f1f9 0%, #72F088 100%)',
          animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite',
          '&:hover': {
            transform: 'scale(1.1)',
            background: 'linear-gradient(135deg, #72F088 0%, #63f1f9 100%)',
            animation: 'none',
            boxShadow: '0 0 20px #63f1f9, 0 0 40px #72F088',
          },
          '& .MuiSvgIcon-root': {
            color: '#000',
            fontSize: '2rem',
            fontWeight: 'bold',
          }
        }}
      >
        <NorthRounded />
      </Button>
    </Box>
  );
};

export default ScrollTop;
