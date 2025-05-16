import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import EditedText from "../EditedText/EditedText";
import LockResetIcon from "@mui/icons-material/LockReset";

const PasswordChangeForm = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LockResetIcon
          sx={{
            mr: 1,
            width: 36,
            height: 36,
          }}
        />
        Change password
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
        }}
      >
        <EditedText
          label="Old password"
          name="oldPassword"
          value={passwordData.oldPassword}
          onChange={(e) =>
            handleChange({
              target: { name: "oldPassword", value: e.target.value },
            })
          }
          isPassword
          required
        />

        <EditedText
          label="New password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={(e) =>
            handleChange({
              target: { name: "newPassword", value: e.target.value },
            })
          }
          isPassword
          required
        />

        <EditedText
          label="Confirm password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            handleChange({
              target: { name: "confirmPassword", value: e.target.value },
            })
          }
          isPassword
          required
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordChangeForm;
