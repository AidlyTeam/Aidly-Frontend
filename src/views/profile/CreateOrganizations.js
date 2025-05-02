import React, { useState } from "react";
import { Box, Button, Typography, Grid, Card, TextField } from "@mui/material";
import EditedText from "@/components/EditedText/EditedText";
import Image from "next/image";

const CreateOrganizations = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    walletAddress: "",
    targetAmount: "",
    statusType: "ACTIVE",
    startDate: "",
    endDate: "",
  });

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Send to backend:", form);
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: "0 0 25px rgba(0,255,163,0.2)",
        mx: "auto",
        mt: 4,
        color: "#fff",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight="bold" color="secondary">
        🚀 Create a New Web3 Campaign
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EditedText
            label="Campaign Title"
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Enter campaign title"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <EditedText
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Describe your campaign"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <EditedText
            label="Wallet Address"
            value={form.walletAddress}
            onChange={handleChange("walletAddress")}
            placeholder="Your wallet address"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Typography 
            variant="body1"
            color="secondary.dark"
            fontWeight="bold"
            mb={1}
          >
            Target Amount (SOL)
          </Typography>
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
                             
                           }}
                         >
                           <Image
                             src="/solana-sol-icon.svg"
                             alt="Solana"
                             width={18}
                             height={18}
                           />
                         </Box>
                       ),
                     }}
                     fullWidth
                     value={form.targetAmount}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          setForm({ ...form, targetAmount: "" });
                        }
                      }}
                      placeholder="Enter target amount"
                     onChange={(e) => {
                        setForm({ ...form, targetAmount: e.target.value });
                     }}
                     sx={{
                       "& .MuiInputBase-input": {
                         fontSize: "16px",
                       },
                     }}
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
        Launch Campaign
      </Button>
    </Card>
  );
};

export default CreateOrganizations;
