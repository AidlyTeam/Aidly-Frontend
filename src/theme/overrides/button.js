const container = (theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "8px",
          fontSize: "16px",
          opacity: 1,
          textTransform: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark + "!important",
            boxShadow: `0px 2px 6px ${theme.palette.common.black}`,
          },

          ...(ownerState.variant == "outlined" && {
            color: theme.palette[ownerState.color].main,
            backgroundColor: "transparent",
            border: `1px solid ${theme.palette[ownerState.color || "primary"].main}`,
            "&:hover": {
              
            border: `1px solid ${theme.palette[ownerState.color].light}`,
              color: theme.palette[ownerState.color].light + "!important",
              // backgroundColor: `${
              //   theme.palette[ownerState.color].main
              // // } !important`,
            },
          }),
          ...(ownerState.variant == "contained" && {
            backgroundColor: theme.palette[ownerState.color].main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette[ownerState.color].dark + "!important",
              boxShadow: `0px 2px 6px ${theme.palette.common.black}`,
            },
          }),
          ...(ownerState.variant == "text" && {
            backgroundColor: "transparent",
            color: theme.palette[ownerState.color].main,
            "&:hover": {
              backgroundColor: theme.palette[ownerState.color].light + "!important",
              color: theme.palette[ownerState.color].dark + "!important",
            },
          }),
        }),
      },
    },
  };
};

export default container;
