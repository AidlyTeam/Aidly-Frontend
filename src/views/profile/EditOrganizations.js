import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Card } from "@mui/material";
import EditedText from "@/components/EditedText/EditedText";

const EditOrganizations = () => {
  const existingData = {
    title: "Save the Ocean",
    description: "A campaign to clean plastic from oceans.",
    walletAddress: "4nV7...X2kM",
    targetAmount: "150.0",
    statusType: "ACTIVE",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    walletAddress: "",
    targetAmount: "",
    statusType: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setForm(existingData);
  }, []);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Update to backend:", form);
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: "0 0 25px rgba(0,255,163,0.2)",
        mx: "auto",
        color: "#fff",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight="bold" color="secondary">
        ✏️ Edit Campaign
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EditedText
            label="Campaign Title"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <EditedText
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <EditedText
            label="Wallet Address"
            value={form.walletAddress}
            onChange={handleChange("walletAddress")}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <EditedText
            label="Target Amount (SOL)"
            value={form.targetAmount}
            onChange={handleChange("targetAmount")}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <EditedText
            label="Start Date"
            value={form.startDate}
            onChange={handleChange("startDate")}
            type="date"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <EditedText
            label="End Date"
            value={form.endDate}
            onChange={handleChange("endDate")}
            type="date"
            required
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          textTransform: "none",
          background: "linear-gradient(to right, #63f1f9, #72F088)",
          color: "#000",
          boxShadow: "0 0 20px #63f1f9",
          borderRadius: "12px",
        }}
      >
        Save Changes
      </Button>
    </Card>
  );
};

export default EditOrganizations;
