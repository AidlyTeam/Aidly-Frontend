import React, { useEffect, useState } from "react";
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
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@/store/user/userSlice";
import { showToast } from "@/utils/showToast";

const DonatePopup = ({ open, onClose, walletAddress }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [agree, setAgree] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const donateDetails = walletAddress;
  
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const { user: userSlice } = useSelector((state) => state);
  const userData = userSlice?.data?.data;

  const handleDonate = async () => {
    const amountToDonate = parseFloat(customAmount || selectedAmount);

    if (!userData?.walletAddress || !donateDetails) {
      alert("Wallet address or donation target is missing.");
      return;
    }

    try {
      const fromPubkey = new PublicKey(userData.walletAddress);
      const toPubkey = new PublicKey(donateDetails);

      if (isNaN(amountToDonate) || amountToDonate <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      const lamports = amountToDonate * 1e9;

      // ✅ Helius RPC Connection
      const connection = new Connection(
        "https://devnet.helius-rpc.com/?api-key=81edb2f6-ad3c-48a0-b8de-2792a9e6464b",
        "confirmed"
      );

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        })
      );

      transaction.feePayer = fromPubkey;

      // ✅ Blockhash alma
      const { blockhash } = await connection.getLatestBlockhash("confirmed");
      transaction.recentBlockhash = blockhash;

      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature, "confirmed");

      router.push("/thankyou");
    } catch (err) {
      showToast("dissmis")
      showToast("error", "Donation failed. Please try again.");
    }

    onClose();
  };

  const predefinedAmounts = [0.001, 0.005, 0.01, 0.05];

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
