import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  useTheme,
  Button,
} from "@mui/material";
import solanaIcon from "../../assets/icons/logo/solana.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from '@mui/icons-material/Verified';

const donations = [
  {
    id: 1,
    logo: solanaIcon,
    name: "Clean Water Project",
    organization: "Water for All Foundation",
    location: "Kenya",
    date: "30 Apr 2025",
    goal: 10000,
    raised: 4500,
    tags: ["Environment", "Urgent"],
    verify : true,
  },
  {
    id: 2,
    logo: solanaIcon,
    name: "Education for Refugees",
    organization: "Hope Initiative",
    location: "Turkey",
    date: "29 Apr 2025",
    goal: 20000,
    raised: 15000,
    tags: ["Education"],
    verify : false,
  },
  {
    id: 3,
    logo: solanaIcon,
    name: "Emergency Earthquake Relief",
    organization: "Global Help",
    location: "Afghanistan",
    date: "28 Apr 2025",
    goal: 50000,
    raised: 50000,
    tags: ["Disaster", "Urgent"],
    verify : true,
  },
];

const DonateList = () => {
  const theme = useTheme();

  const getProgressGradient = (progress) => {
    if (progress < 25) return "linear-gradient(to right, red, red)";
    if (progress < 50) return "linear-gradient(to right, red, orange)";
    if (progress < 75) return "linear-gradient(to right, orange, yellow)";
    return "linear-gradient(to right, yellow, green)";
  };
  
  

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
          const progress = (item.raised / item.goal) * 100;

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
              >
                <CardHeader
                  sx={{ pb: 0 }}
                  avatar={
                    <Box display="flex" flexDirection="column" width="100%">
                      <Avatar
                        src={item.logo.src}
                        alt={item.organization}
                        sx={{ width: 56, height: 56, mb: 1 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}
                          fontSize={18}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap : 0.5,
                          }}
                        >
                          {item.name}
                          {item.verify && <VerifiedIcon fontSize="medium" sx={{ mr: 0.5,
                            color: theme.palette.primary.dark,
                           }} />}

                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.dark"
                          fontWeight={500}
                          fontSize={16}
                          sx={{ cursor: "pointer" }}
                        >
                          {item.organization}
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
                          {item.location}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.main,
                      marginTop: "32px",
                      fontSize: "14px",
                    }}
                  >
                    Posted: {item.date}
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

                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                    {item.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        variant="outlined"
                        color={
                          tag.toLowerCase() === "urgent" ? "error" : "info"
                        }
                        size="small"
                        sx={
                          tag.toLowerCase() === "urgent"
                            ? {
                                animation: "pulse 1s infinite",
                                borderColor: theme.palette.error.main,
                              }
                            : {}
                        }
                      />
                    ))}
                  </Stack>

                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme.palette.secondary.dark}
                    >
                      Raised: ${item.raised.toLocaleString()} / $
                      {item.goal.toLocaleString()}
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

export default DonateList;
