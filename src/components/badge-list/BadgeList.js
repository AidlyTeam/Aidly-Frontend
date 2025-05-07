import { Box, Typography, useTheme } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CustomTooltip from "../tooltip";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const BadgeList = ({ badges }) => {
  const theme = useTheme();
  const palette = theme.palette;

  if (!badges?.length) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MilitaryTechIcon
            sx={{
              mr: 1,
              width: 36,
              height: 36,
            }}
          />
          Badges
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            borderRadius: 2,
            border: "1px dashed rgba(0, 240, 255, 0.3)",
          }}
        >
          <EmojiEventsIcon
            sx={{
              fontSize: 60,
              color: "#00F0FF",
              opacity: 0.5,
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 1,
              fontWeight: "bold",
            }}
          >
            No Badges Yet
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              opacity: 0.8,
              maxWidth: "400px",
            }}
          >
            Don't worry! Your journey to earning badges is just beginning. Keep participating in campaigns and contributing to make a difference. Your first badge is waiting for you!
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MilitaryTechIcon
          sx={{
            mr: 1,
            width: 36,
            height: 36,
          }}
        />
        Badges
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {badges?.map((badge) => (
          <Box
            key={badge.id}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, rgba(0, 240, 255, 0.13), rgba(0, 240, 255, 0.27))",
              border: "2px solid #00F0FF",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(0, 240, 255, 0.07), rgba(0, 240, 255, 0.13))",
                animation: "rotate 3s linear infinite",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: -50,
                left: -50,
                right: -50,
                bottom: -50,
                background:
                  "radial-gradient(circle, rgba(0, 240, 255, 0.13) 0%, transparent 70%)",
                animation: "pulse 2s ease-in-out infinite",
              },
            }}
          >
            <CustomTooltip title={badge.description}>
              <img
                component="img"
                src={`/api/${badge.iconPath}`}
                alt={badge.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </CustomTooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BadgeList;
