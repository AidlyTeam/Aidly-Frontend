import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
  Paper,
  Button,
  Fade,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDonationsForCampaign } from "@/store/donations/donationsSlice";
import Image from "next/image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WavesIcon from "@mui/icons-material/Waves";
import VerifiedIcon from "@mui/icons-material/Verified";

const AllDonations = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { donations: donationSlice } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getDonationsForCampaign());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  const handleViewOnSolscan = (transactionId) => {
    window.open(`https://solscan.io/tx/${transactionId}?cluster=devnet`, '_blank', 'noopener,noreferrer');
  };

  if (donationSlice.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <Box>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundSize: "200% 100%",
            animation: "gradientFlow 3s linear infinite",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, rgba(114, 240, 136, 0.1) 0%, rgba(99, 241, 249, 0.1) 100%)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          >
            <WavesIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1a1a1a",
                mb: 1,
              }}
            >
              All Donations
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#666666" }}
            >
              Transparent blockchain-based donation history
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {donationSlice?.data?.data?.donations?.map((donation, index) => (
          <Grid item xs={12} key={donation?.id}>
            <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card
                sx={{
                  borderRadius: 4,
                  background: "#ffffff",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#1a1a1a",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {donation?.campaignTitle}
                        <VerifiedIcon
                          sx={{
                            fontSize: 20,
                            color: "#2E7D32",
                          }}
                        />
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666666",
                          mt: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {formatDate(donation?.donationDate)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          background: "rgba(114, 240, 136, 0.1)",
                          p: 1.5,
                          borderRadius: 2,
                          width: "fit-content",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#2E7D32",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontWeight: "bold",
                          }}
                        >
                          {donation?.amount}
                          <Image
                            src="/solana-sol-icon.svg"
                            alt="Solana"
                            width={24}
                            height={24}
                            style={{
                              filter: "drop-shadow(0 0 8px rgba(114, 240, 136, 0.5))",
                            }}
                          />
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          justifyContent: { xs: "flex-start", md: "flex-end" },
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => handleViewOnSolscan(donation?.transactionID)}
                          startIcon={<OpenInNewIcon />}
                          sx={{
                            color: "#0288D1",
                            borderColor: "rgba(99, 241, 249, 0.2)",
                            backgroundColor: "rgba(99, 241, 249, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(99, 241, 249, 0.2)",
                              borderColor: "rgba(99, 241, 249, 0.3)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 12px rgba(2, 136, 209, 0.2)",
                            },
                          }}
                        >
                          View on Solscan
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllDonations; 