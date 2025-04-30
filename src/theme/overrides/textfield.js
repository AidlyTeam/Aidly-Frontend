const textfield = (theme) => {
  return {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "& .MuiInputBase-root": {
            borderRadius: "12px",
            backgroundColor:
              ownerState.variant === "filled" ? theme.palette.background.paper : "#FFFFFF",
            border:
              ownerState.variant === "outlined"
                ? "1px solid #E0E0E0"
                : "none",
            transition: "border-color 0.3s ease",
            "&:hover": {
              borderColor: "#A0A0A0",
              backgroundColor:
                ownerState.variant === "outlined" ? "#F5F5F5" : undefined,
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 1px ${theme.palette.secondary.dark}`,
            },
            "&.Mui-disabled": {
              backgroundColor: "#F0F0F0",
              color: "#A0A0A0",
            },
          },

          "& .MuiInputBase-input": {
            color: "#1A1A1A",
            fontWeight: 500,
            padding: "12px",
            fontSize: "14px",
            "&::placeholder": {
              color: "#9E9E9E",
              opacity: 1,
            },
          },

          "& .MuiInputLabel-root": {
            fontSize: "14px",
            color: "#5C5C5C",
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
            "&.Mui-disabled": {
              color: "#A0A0A0",
            },
          },

          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // use our custom border above
          },

        }),
      },
    },
  };
};

export default textfield;
