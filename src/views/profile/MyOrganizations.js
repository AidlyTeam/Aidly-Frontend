import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Fade,
  LinearProgress,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { theme } from "@/configs/theme";
import { useRouter } from "next/router";

const dummyCampaigns = [
  // {
  //   id: 1,
  //   title: "Web3 for All",
  //   description: "A campaign to educate people about Web3.",
  //   collected: 5.0,
  //   target: 10.0,
  // },
  // {
  //   id: 2,
  //   title: "Decentralized Future",
  //   description: "Funding for decentralized applications.",
  //   collected: 3.5,
  //   target: 8.0,
  // },
];

const MyOrganizations = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(dummyCampaigns);
  }, []);

  const getProgressGradient = (progress) => {
    if (progress < 25) return "linear-gradient(to right, red, red)";
    if (progress < 50) return "linear-gradient(to right, red, orange)";
    if (progress < 75) return "linear-gradient(to right, orange, yellow)";
    return "linear-gradient(to right, yellow, green)";
  };

  const router = useRouter();

  return (
    <Box>
      {campaigns.length === 0 ? (
        <Fade in timeout={800}>
          <Box
            textAlign="center"
            mt={8}
            sx={{
              borderRadius: 4,
              p: 5,
              boxShadow: "0 0 25px rgba(0,255,163,0.2)",
              background: "linear-gradient(15deg, #ffff, #111, #ffff)",
              "&:hover": {
                boxShadow: "0 0 35px rgba(99,241,249,0.5)",
              },
            }}
          >
            <BlurOnIcon sx={{ fontSize: 64, color: "#63f1f9" }} />
            <Typography variant="h5" mt={2} color="success.main">
              Not Start a Campaign
            </Typography>
            <Typography variant="body1" color="secondary.light">
              Start a campaign and make a difference in the Web3 world.
            </Typography>
            <Button
              variant="contained"
              startIcon={<RocketLaunchIcon />}
              onClick={() => router.push("/profile/my-organizations/create")}
              sx={{
                mt: 3,
                background: "linear-gradient(to right, #63f1f9, #72F088)",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 0 20px #63f1f9",
              }}
            >
              Start a Campaign
            </Button>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
         
              <Typography variant="h3" color="secondary.dark">
                My Campaigns
              </Typography>
              <Button
                variant="contained"
                startIcon={<RocketLaunchIcon />}
                onClick={() => router.push("/profile/my-organizations/create")}
                sx={{
                  background: "linear-gradient(to right, #63f1f9, #72F088)",
                  color: "#000",
                  fontWeight: "bold",
                  px: 4,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 0 20px #63f1f9",
                }}
              >
                Create a Campaign
              </Button>
            
          </Grid>
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: "0 0 15px rgba(0,255,163,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  transition: "transform 0.3s ease, background 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 0 25px rgba(99,241,249,0.5)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    color="secondary.dark"
                    fontWeight="bold"
                  >
                    {campaign.title}
                  </Typography>
                  <Typography variant="body2" color="gray" mt={1}>
                    {campaign.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    mt: 2,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="body2" color="secondary.dark">
                    <strong>
                      {campaign.collected} SOL / {campaign.target} SOL{" "}
                    </strong>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(campaign.collected / campaign.target) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mt: 0.5,
                      backgroundColor: theme.palette.grey[300],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        backgroundImage: getProgressGradient(
                          (campaign.collected / campaign.target) * 100
                        ),
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      router.push(
                        `/profile/my-organizations/edit/${campaign.id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyOrganizations;
