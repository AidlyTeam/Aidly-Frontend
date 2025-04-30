import React, { useEffect } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { theme } from "@/configs/theme";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";
const { default: BlankLayout } = require("@/layout/BlankLayout");

const DonateComplate = () => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={5}
          sx={{
            borderRadius: 3,
            p: 6,
            textAlign: "center",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              fontSize: 64,
              animation: "popIn 0.6s ease-out forwards",
              mb: 3,
            }}
          >
            🎉
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Your donate is complete!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Thank you for your generous contribution! Your support makes a
            difference.
            <br />
            We appreciate your kindness and generosity.
          </Typography>

          <Button
            variant="contained"
            onClick={() => router.push("/")}
            sx={{
              marginLeft: "auto",
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
            Back to Home
          </Button>
        </Paper>
      </Container>

      <style>{`
        @keyframes popIn {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
};

DonateComplate.guestGuard = true;
DonateComplate.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default DonateComplate;
