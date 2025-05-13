import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { theme } from "@/configs/theme";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/store/user/userSlice";
import EditedText from "../EditedText/EditedText";

const UpdateProfile = ({ open, onClose, isDefault = true }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = async () => {
    if (!name || !surname || !email) {
      alert("Please fill in the name, surname and email fields.");
      return;
    }
  
    const payload = { name, surname, email };
  
    try {
      await dispatch(updateProfile(payload)).unwrap();
      onClose(); 
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };
  

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (!isDefault) {
          return; // Prevent closing if isDefault is false
        }
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown={!isDefault}
    >
      <DialogTitle
        color={theme.palette.secondary.main}
        sx={{ fontWeight: "bold" }}
      >
        Update Profile
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <EditedText
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <EditedText
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <EditedText
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleUpdate}>
          Update Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfile;
