import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import HelpImage from "../../assets/icons/help.png";
import Image from "next/image";
import { theme } from "@/configs/theme";
import { keyframes } from "@mui/system";

const borderAnimation = keyframes`
  0% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(100% 100%, 0 100%, 0 100%, 100% 100%);
  }
  100% {
    clip-path: polygon(0 100%, 0 0, 0 0, 0 100%);
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 240, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const DonationCard = ({ organization, amount, date }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "16px",
        position: "relative",
        background: "#ffffff",
        border: "1px solid rgba(0, 240, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        color: "#000",
        overflow: "hidden",
        minHeight: "120px",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 40px rgba(0, 240, 255, 0.2)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "2px solid transparent",
          borderRadius: "16px",
          background: "linear-gradient(90deg, #00F0FF, #00F0FF) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          animation: `${borderAnimation} 4s linear infinite`,
        },
      }}
    >
      <Grid container alignItems="center" sx={{ height: "100%", position: "relative" }}>
        <Grid
          item
          xs={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "80%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              animation: `${pulseAnimation} 2s infinite, ${floatAnimation} 3s ease-in-out infinite`,
              border: "1px solid rgba(0, 240, 255, 0.3)",
              backdropFilter: "blur(5px)",
            }}
          >
            <Image src={HelpImage} alt="Logo" width={60} height={60} />
          </Box>
        </Grid>

        <Box
          sx={{
            position: "absolute",
            top: "15%",
            bottom: "15%",
            left: "25%",
            width: "2px",
            background: "repeating-linear-gradient(to bottom, #9AA8BC 0px, #9AA8BC 4px, transparent 4px, transparent 8px)",
            opacity: 0.5,
            zIndex: 1,
          }}
        />

        <Grid item xs={9} sx={{ pl: 2 }}>
          <CardContent sx={{ paddingBottom: "0 !important" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.secondary.dark,
                transition: "all 0.3s ease",
               
              }}
            >
              {organization}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.success.dark,
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                transition: "all 0.3s ease",
               
              }}
            >
              {amount}
              <Image
                src="/solana-sol-icon.svg"
                alt="Solana"
                width={22}
                height={22}
                style={{
                  filter: "drop-shadow(0 0 5px rgba(0, 240, 255, 0.5))",
                }}
              />
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.secondary.light,
                mt: 1,
                opacity: 0.8,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              {formatDate(date)}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DonationCard;
