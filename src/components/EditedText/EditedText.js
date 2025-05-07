import React from "react";
import {
  TextField as MuiTextField,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { theme } from "@/configs/theme";
const EditedText = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  fullWidth = true,
  disabled = false,
  required = false,
  endAdornment = null,
  isPassword = false,
  infoIcon = null,
  info = null,
  error = null,
  errorText = null,
  name,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: "relative" }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: "bold",
          color: theme.palette.secondary.dark + " !important",
        }}
      >
        {label}
      </Typography>
      {info && (
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: theme.palette.secondary.main + " !important",
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          {infoIcon}
          {info}
        </Typography>
      )}

      <TextField
        value={value}
        onChange={onChange}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={disabled}
        required={required}
        variant="outlined"
        size="medium"
        error={Boolean(error)}
        helperText={error ? error : ""}
        name={name}
        InputProps={{
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ) : (
            endAdornment
          ),
        }}
      />
    </div>
  );
};

export default EditedText;
