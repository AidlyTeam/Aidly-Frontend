"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { theme } from "@/configs/theme";
import Image from "next/image";
import { useRouter } from "next/router";

const DonatePopup = ({ open, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleDonate = () => {
    const amountToDonate = customAmount || selectedAmount;

    

    console.log("Bağış yapılıyor:", amountToDonate, "SOL")
    onClose();
    router.push("/thankyou");

  };

  const predefinedAmounts = [1, 2, 3, 4];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        color={theme.palette.secondary.main}
        sx={{ fontWeight: "bold" }}
      >
        Lets Donate
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.light }}
          >
            Donation Amount
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {predefinedAmounts.map((amt) => (
              <Button
                key={amt}
                color="info"
                variant={selectedAmount === amt ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                }}
              >
                {amt} SOL
              </Button>
            ))}
          </Box>

          <TextField
            type="number"
            InputProps={{
              startAdornment: (
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 1,
                    width: 24,
                    height: 24,
                  }}
                >
                  <Image
                    src="/solana-sol-icon.svg"
                    alt="Solana"
                    width={32}
                    height={32}
                  />
                </Box>
              ),
            }}
            fullWidth
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "24px",
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
            }
            label="I agree to the terms and conditions"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleDonate}
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
      </DialogActions>
    </Dialog>
  );
};

export default DonatePopup;
