import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { theme } from "@/configs/theme";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import DonatePopup from "../popup/DonatePopup";
import { useState } from "react";
import Image from "next/image";

const DonateDetailPagesCard = ({ donateDetails = [] }) => {
  const progress = (donateDetails.raised / donateDetails.goal) * 100;

  const getProgressGradient = (progress) => {
    if (progress < 25) return "linear-gradient(to right, red, red)";
    if (progress < 50) return "linear-gradient(to right, red, orange)";
    if (progress < 75) return "linear-gradient(to right, orange, yellow)";
    return "linear-gradient(to right, yellow, green)";
  };

  const [open, setOpen] = useState(false);


  const handleDonateClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(donateDetails);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} key={donateDetails.id}>
        <Card
          sx={{
            borderRadius: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: 3,
            boxSizing: "border-box",
          }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" width="100%">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {donateDetails?.categories?.categories?.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      variant="outlined"
                      color={
                        tag.name.toLowerCase() === "urgent" ? "error" : "info"
                      }
                      size="small"
                      sx={
                        tag.name.toLowerCase() === "urgent"
                          ? {
                            animation: "pulse 1s infinite",
                            borderColor: theme.palette.error.main,
                          }
                          : {}
                      }
                    />
                  ))}
                </Stack>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={36}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 0.5,
                  }}
                >
                  {donateDetails.title}
                  {donateDetails.isVerified && (
                    <VerifiedIcon
                      fontSize="medium"
                      sx={{ mr: 0.5, color: theme.palette.primary.dark }}
                    />
                  )}
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={400}
                  fontSize={20}
                  sx={{
                    color: theme.palette.secondary.main,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {donateDetails.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="secondary.dark"
                  fontWeight={500}
                  fontSize={16}
                  mb={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Turkey
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography
              sx={{
                color: theme.palette.secondary.main,
                marginTop: "32px",
                fontSize: "14px",
              }}
            >
              Posted: {new Date(donateDetails.startDate).toLocaleDateString()}
            </Typography>

            <Box
              sx={{
                marginTop: "16px",
                marginBottom: "16px",
                width: "100%",
                border: "1px dashed",
                borderColor: theme.palette.secondary.light,
                opacity: 0.5,
                borderRadius: 1,
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
                gap: 2,
              }}
            >
              <AvatarGroup max={4} spacing="small">
                <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/22.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/women/32.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
                <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
              </AvatarGroup>
              <Typography
                variant="body2"
                fontWeight={500}
                color={theme.palette.secondary.dark}
                fontSize={16}
              >
                Total Donors: 5
              </Typography>
            </Box>

            <Box mt={2}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={theme.palette.secondary.dark}
                >
                  Raised: {donateDetails.raisedAmount} /{" "}
                  {donateDetails.targetAmount}
                </Typography>
                <Image
                  src="/solana-sol-icon.svg"
                  alt="Solana"
                  width={24}
                  height={24}
                />
              </Box>
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
                    backgroundImage: getProgressGradient(
                      (Number(donateDetails.raisedAmount) /
                        Number(donateDetails.targetAmount)) *
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
              padding: "16px",
              position: "relative",
              bottom: 0,
              right: 0,
              width: "97%",
            }}
          >
            <Button
              variant="contained"
              ü
              onClick={handleDonateClick}
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
              Donate Now
            </Button>
          </Box>
        </Card>
      </Grid>
      <DonatePopup
        open={open}
        onClose={handleClose}
        organization={donateDetails.name}
        walletAddress={donateDetails.walletAddress}
        campaignId={donateDetails.id}
      />
    </Grid>
  );
};

export default DonateDetailPagesCard;
