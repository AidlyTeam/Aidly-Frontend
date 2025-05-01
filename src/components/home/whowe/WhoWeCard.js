import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import HelpImage from "../../../assets/Save the Earth-bro.png";
import { theme } from "@/configs/theme";
import { useRouter } from "next/router";

const WhoWeCard = () => {
  const router = useRouter();
  return (
    <Card
      sx={{
        borderRadius: "16px",
        padding: 3,
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                color: theme.palette.secondary.dark,
              }}
            >
              Who is Aidly
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: 3, color: theme.palette.secondary.main }}
            >
              We are here to make it easier to help others faster and safer
              using Solana technology! We are a team of passionate individuals
              who believe in the power of technology to make a difference in the
              world.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/donates")}
            >
              Let’s Get Started
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src={HelpImage}
                alt="Who We Are"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WhoWeCard;
