import React from "react";
import { Box, Typography, Button } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { keyframes } from "@emotion/react";
import { theme } from "@/configs/theme";

// Basit fade-in + bounce animasyonu
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const NoDonations = ({ onDonateClick }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
        p: 4,
        backgroundColor: "#ffff",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <VolunteerActivismIcon
        sx={{
          fontSize: 150,
          color: theme.palette.success.main,
          animation: `${bounce} 2s infinite`,
          mb: 2,
        }}
      />
      <Typography variant="h6" gutterBottom>
        You haven't helped anyone yet{" "}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#ccc" }}>
        Come on, make the world a slightly better place now!{" "}
      </Typography>
      <Button
        variant="contained"
        onClick={onDonateClick}
        sx={{
          marginRight: "0",
          fontSize: "16px",
          padding: "8px 36px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #72F088 0%, #63f1f9 100%)",
          color: "#ffff",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: `0 0 20px ${theme.palette.primary.main}`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 0 30px rgba(0, 255, 163, 0.6)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-75%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
            transform: "skewX(-20deg)",
            animation: "shine 2.5s infinite",
          },
          "@keyframes shine": {
            "0%": { left: "-75%" },
            "50%": { left: "125%" },
            "100%": { left: "125%" },
          },
        }}
      >
        Start Helping
      </Button>
    </Box>
  );
};

export default NoDonations;
