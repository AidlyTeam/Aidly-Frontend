import { Tooltip, styled, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  zIndex: 999999,
  [`& .${tooltipClasses.arrow}`]: {
    color: "transparent",
    "&::before": {
      background: "linear-gradient(135deg, #0ff 0%, #8b5cf6 100%)",
      borderRadius: "4px",
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    background: "rgba(10, 10, 20, 0.9)",
    backdropFilter: "blur(10px)",
    color: "#C3F3FF", 
    fontSize: theme.typography.pxToRem(13),
    padding: "0.6rem 1rem",
    fontFamily: "Space Grotesk, sans-serif",
    border: "1px solid rgba(0,255,255,0.3)",
    borderRadius: "12px",
    boxShadow: "0 0 18px rgba(0,255,255,0.25)",
    textShadow: "0 0 6px rgba(0,255,255,0.6)",
    transition: "all 0.3s ease",
  },
}));

export default CustomTooltip;
