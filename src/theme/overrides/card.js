import { hexToRGBA } from "@/utils/hex-to-rgba"

const card = theme => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: hexToRGBA(theme.palette.background.paper, 0.2),
          border : `1px solid ${theme.palette.secondary.light}`,
          // p: "2rem 4rem",
          // boxShadow: "0px 2px 10px -1px rgba(0,0,0,0.3), 0px 1px 10px 0px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.2)",
          // boxShadow: "none",
          // zIndex: 100,
          // "& .MuiCardContent-root": {
          //     padding: "2rem 4rem",
          //     "@media (max-width: 600px)": {
          //         padding: "1rem 2rem",
          //     },
          //     "&:last-child": {
          //         paddingBottom: "2rem",
          //     },
          // },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1rem",
          paddingBottom: "1rem !important",
        },
      },
    },
  }
}

export default card
