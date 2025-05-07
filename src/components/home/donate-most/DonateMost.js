import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useRouter } from "next/router";

const DonateMost = ({ donations = [], loading = false }) => {
  const theme = useTheme();
  const router = useRouter();

  const getProgressGradient = (progress) => {
    if (progress < 25) return "linear-gradient(to right, red, red)";
    if (progress < 50) return "linear-gradient(to right, red, orange)";
    if (progress < 75) return "linear-gradient(to right, orange, yellow)";
    return "linear-gradient(to right, yellow, green)";
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <Grid container spacing={3}>
        {donations.map((item) => {
          const progress = (Number(item.raisedAmount) / Number(item.targetAmount)) * 100;
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  ":hover": {
                    boxShadow:
                      "0px 2px 10px -1px rgba(0,0,0,0.3), 0px 1px 10px 0px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  },
                }}
                onClick={() => router.push(`/donates/${item.id}`)}
              >
                <CardContent>
                  <Box display="flex" flexDirection="column" width="100%">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`/api/${item.imagePath}`}
                        alt={item.title}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          maxHeight: "150px",
                          marginBottom: "16px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: theme.palette.secondary.light,
                        marginBottom: "16px",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        fontSize={18}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: 0.5,
                        }}
                      >
                        {item.title}
                        {item.isVerified && (
                          <VerifiedIcon
                            fontSize="medium"
                            sx={{ mr: 0.5, color: theme.palette.primary.dark }}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.dark"
                        fontWeight={500}
                        fontSize={16}
                        sx={{ cursor: "pointer" }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary.dark"
                        fontWeight={500}
                        fontSize={16}
                        mb={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Turkey
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.main,
                      marginTop: "32px",
                      fontSize: "14px",
                    }}
                  >
                    Posted: {new Date(item.startDate).toLocaleDateString()}
                  </Typography>

                  <Box
                    sx={{
                      height: "1px",
                      backgroundColor: theme.palette.secondary.light,
                      marginTop: "16px",
                      marginBottom: "16px",
                      width: "100%",
                    }}
                  />

                  {item.categories?.categories && item.categories.categories.length > 0 && (
                    <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                      {item.categories.categories.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          variant="outlined"
                          color="info"
                          size="small"
                        />
                      ))}
                    </Stack>
                  )}

                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme.palette.secondary.dark}
                    >
                      Raised: ${item.raisedAmount} / ${item.targetAmount}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mt: 0.5,
                        backgroundColor: theme.palette.grey[300],
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 5,
                          backgroundImage: getProgressGradient(progress),
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DonateMost;
