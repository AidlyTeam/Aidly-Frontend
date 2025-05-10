import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Card, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material";
import EditedText from "@/components/EditedText/EditedText";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createCampaign } from "@/store/campaign/campaignSlice";

const CreateOrganizations = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    walletAddress: "",
    targetAmount: "",
    statusType: "normal",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Check if urgent parameter exists in URL
    if (router.query.urgent === 'true') {
      setForm(prev => ({
        ...prev,
        statusType: 'urgent'
      }));
    }
  }, [router.query]);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      const formattedStartDate = form.startDate ? new Date(form.startDate).toISOString() : '';
      const formattedEndDate = form.endDate ? new Date(form.endDate).toISOString() : '';

      Object.keys(form).forEach(key => {
        if (form[key] !== "") {
          if (key === 'startDate') {
            formData.append(key, formattedStartDate);
          } else if (key === 'endDate') {
            formData.append(key, formattedEndDate);
          } else {
            formData.append(key, form[key]);
          }
        }
      });

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      formData.append('acceptedTokenSymbol', "SOL");

      const response = await dispatch(createCampaign(formData));

      if (response.meta.requestStatus === "fulfilled") {
        router.push('/profile/my-campaigns');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
        ...(form.statusType === 'urgent' && {
          boxShadow: "0 0 25px rgba(255,0,0,0.3)",
          border: "2px solid rgba(255,0,0,0.3)",
          animation: "urgentPulse 2s infinite",
        }),
      }}
    >
      <style>
        {`
          @keyframes urgentPulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
          }
        `}
      </style>

      <Typography variant="h5" mb={3} fontWeight="bold" color="secondary">
        {form.statusType === 'urgent' ? '🚨 Create Urgent Campaign' : '🚀 Create a New Web3 Campaign'}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="secondary.dark" fontWeight="bold" mb={1}>
              Campaign Image
            </Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    borderColor: 'secondary.dark',
                    backgroundColor: 'rgba(99, 241, 249, 0.1)',
                  },
                }}
              >
                Upload Image
              </Button>
            </label>
            {imageFile && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>
        </Grid>

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

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>
              Campaign Status
            </FormLabel>
            <RadioGroup
              row
              value={form.statusType}
              onChange={handleChange("statusType")}
            >
              <FormControlLabel
                value="normal"
                control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                label="Normal"
                sx={{ color: 'secondary.dark' }}
              />
              <FormControlLabel
                value="urgent"
                control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                label="Urgent"
                sx={{ color: 'secondary.dark' }}
              />
              <FormControlLabel
                value="critical"
                control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                label="Critical"
                sx={{ color: 'error.main' }}
              />
              <FormControlLabel
                value="featured"
                control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                label="Featured"
                sx={{ color: 'secondary.dark' }}
              />
              <FormControlLabel
                value="scheduled"
                control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                label="Scheduled"
                sx={{ color: 'secondary.dark' }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <EditedText
            label="Start Date"
            value={form.startDate}
            onChange={handleChange("startDate")}
            type="datetime-local"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <EditedText
            label="End Date"
            value={form.endDate}
            onChange={handleChange("endDate")}
            type="datetime-local"
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
          background: form.statusType === 'urgent' 
            ? "linear-gradient(to right, #ff0000, #ff6b6b)"
            : "linear-gradient(to right, #63f1f9, #72F088)",
          color: "#000",
          boxShadow: form.statusType === 'urgent'
            ? "0 0 20px rgba(255,0,0,0.5)"
            : "0 0 20px #63f1f9",
          borderRadius: "12px",
          "&:hover": {
            background: form.statusType === 'urgent'
              ? "linear-gradient(to right, #ff0000, #ff6b6b)"
              : "linear-gradient(to right, #63f1f9, #72F088)",
            boxShadow: form.statusType === 'urgent'
              ? "0 0 30px rgba(255,0,0,0.6)"
              : "0 0 30px #63f1f9",
          },
        }}
      >
        {form.statusType === 'urgent' ? 'Launch Urgent Campaign' : 'Launch Campaign'}
      </Button>
    </Card>
  );
};

export default CreateOrganizations;
