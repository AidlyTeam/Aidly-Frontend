import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import EditedText from "../EditedText/EditedText";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
const PersonalInfoForm = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Info submitted:", formData);
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
            label="First name"
            value={formData.firstName}
            onChange={(e) =>
              handleChange({
                target: { name: "firstName", value: e.target.value },
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Last name"
            value={formData.lastName}
            onChange={(e) =>
              handleChange({
                target: { name: "lastName", value: e.target.value },
              })
            }
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EditedText
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) =>
              handleChange({ target: { name: "email", value: e.target.value } })
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditedText
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              handleChange({ target: { name: "phone", value: e.target.value } })
            }
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
