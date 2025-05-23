
const listitem = theme => {
  return {
    MuiListSubheader: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.action.active,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: "1rem",
          borderRadius: "0.3rem",
          backgroundColor: ownerState.active ? theme.palette.action.active : "transparent",
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
  }
}

export default listitem
