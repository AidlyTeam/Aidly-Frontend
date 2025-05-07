import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import EditedText from "../EditedText/EditedText";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { updateProfile } from "@/store/user/userSlice";
import { useDispatch } from "react-redux";

const PersonalInfoForm = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    surname: initialData.surname || "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));  
  };

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

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;
