import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { theme } from "@/configs/theme";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { hexToRGBA } from "@/utils/hex-to-rgba";

const StatisticCard = () => {
  const data = [
    {
      title: "Total Users",
      count: 500,
      icon: PeopleAltIcon,
    },
    {
      title: "Total Companies",
      count: 20,
      icon: BusinessIcon,
    },
    {
      title: "Total Donations",
      count: 1000,
      icon: VolunteerActivismIcon,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(auto-fit, minmax(300px, 1fr))",
          md: "repeat(auto-fit, minmax(400px, 1fr))",
        },
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {data.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "16px",
              padding: 1,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              backdropFilter: "blur(12px)",
              transition: "transform 0.3s ease",
              '&:hover': {
                transform: "translateY(-5px)",
              },
              '&::before': {
                content: '""',
                position: "absolute",
                width: "150%",
                height: "150%",
                background: "linear-gradient(135deg, #63f1f9, #72F088 )",
                top: "100%",
                left: "-50%",
                zIndex: 0,
                transform: "rotate(-25deg)",
                transition: "all 0.5s ease-in-out",
              },
              '&:hover::before': {
                top: "-30%",
              },
            }}
          >
            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    width: "70%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                    }}
                  >
                    {item.count}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.secondary.dark,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: hexToRGBA(theme.palette.info.main,0.8),
                    border: `2px solid ${theme.palette.info.dark}`,
                    borderRadius: "10px",
                    padding: 2,
                    width: "15%",
                  }}
                >
                  <Icon
                    style={{
                      color: "#fff",
                      fontSize: 40,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default StatisticCard;
