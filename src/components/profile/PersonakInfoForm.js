import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import EditedText from "../EditedText/EditedText";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import { connectWallet, updateProfile } from "@/store/user/userSlice";
import { useDispatch } from "react-redux";
import bs58 from "bs58";


const PersonalInfoForm = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name,
    surname: initialData?.surname,
    email: initialData?.email,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  const handleConnectWallet = async () => {
    try {
      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      const message = `Giriş doğrulaması: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signed = await window.solana.signMessage(encodedMessage, "utf8");

      const signatureBase58 = bs58.encode(signed.signature);

      const payload = {
        message,
        signatureBase58,
        walletAddress,
      };

      const result = await dispatch(connectWallet(payload)).unwrap();
      console.log(result);
    } catch (err) {
      console.error("Phantom connection error:", err);
    }
  };

  useEffect(() => {
    setFormData({
      name: initialData?.name,
      surname: initialData?.surname,
    });
  }, [initialData]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 6 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaceRetouchingNaturalIcon
          sx={{
            mr: 1,
            width: 36,
            height: 36,
          }}
        />
        Personal Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditedText
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Role"
            value={initialData.role || ""}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Wallet Address"
            value={initialData.walletAddress || ""}
            disabled
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save changes
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleConnectWallet}
          sx={{
            background: "linear-gradient(45deg, #63f1f9 30%, #72F088 90%)",
            color: "#000",
            padding: "12px 32px",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: "0 0 20px rgba(99, 241, 249, 0.5)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              animation: "shimmer 2s infinite",
            },
            "&:hover": {
              background: "linear-gradient(45deg, #63f1f9 40%, #72F088 100%)",
              boxShadow: "0 0 30px rgba(99, 241, 249, 0.7)",
              transform: "scale(1.05)",
            },
          }}
        >
          Connect Wallet
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;
