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
  Pagination,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "@/configs/theme";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCampaign, deleteCampaign } from "@/store/campaign/campaignSlice";

const MyOrganizations = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { campaign: campaignSlice } = useSelector((state) => state);
  console.log("Campaign Slice:", campaignSlice);
  const campaigns = Array.isArray(campaignSlice?.data?.data)
    ? campaignSlice.data.data
    : [];
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData.id;

  const fetchCampaigns = () => {
    dispatch(
      getCampaign({
        userID: userId,
        page: page.toString(),
        limit: limit.toString(),
      })
    );
  };

  useEffect(() => {
    fetchCampaigns();
  }, [dispatch, page, userId]);

  const handleDelete = async (campaignId) => {
    try {
      const response = await dispatch(deleteCampaign(campaignId));
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const getProgressGradient = (progress) => {
    if (progress < 25) return "linear-gradient(to right, red, red)";
    if (progress < 50) return "linear-gradient(to right, red, orange)";
    if (progress < 75) return "linear-gradient(to right, orange, yellow)";
    return "linear-gradient(to right, yellow, green)";
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        <>
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Typography
                        variant="h6"
                        color="secondary.dark"
                        fontWeight="bold"
                      >
                        {campaign.title}
                      </Typography>
                      <IconButton
                        onClick={() => handleDelete(campaign.id)}
                        sx={{
                          color: "error.main",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="gray" mt={1}>
                      {campaign.description}
                    </Typography>

                    {/* Categories Section */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                      mb={1}
                    >
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {campaign.categories?.categories?.map((category) => (
                          <Chip
                            key={category.id}
                            label={category.name}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(99, 241, 249, 0.1)",
                              color: "secondary.main",
                              border: "1px solid",
                              borderColor: "secondary.main",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color={theme.palette.secondary.dark}
                      >
                        Raised: ${campaign.raisedAmount} / $
                        {campaign.targetAmount}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (Number(campaign.raisedAmount) /
                            Number(campaign.targetAmount)) *
                          100
                        }
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          mt: 0.5,
                          backgroundColor: theme.palette.grey[300],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            backgroundImage: getProgressGradient(
                              (Number(campaign.raisedAmount) /
                                Number(campaign.targetAmount)) *
                                100
                            ),
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          router.push(
                            `/profile/my-organizations/edit/${campaign.id}`
                          )
                        }
                        sx={{
                          borderColor: "secondary.main",
                          color: "secondary.main",
                          "&:hover": {
                            borderColor: "secondary.dark",
                            backgroundColor: "rgba(99, 241, 249, 0.1)",
                          },
                          mr: 1,
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() =>
                          router.push(
                            `/profile/my-organizations/categories/${campaign.id}`
                          )
                        }
                        sx={{
                          borderColor: "secondary.main",
                          color: "secondary.main",
                          "&:hover": {
                            borderColor: "secondary.dark",
                            backgroundColor: "rgba(99, 241, 249, 0.1)",
                          },
                        }}
                      >
                        Categories
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default MyOrganizations;
