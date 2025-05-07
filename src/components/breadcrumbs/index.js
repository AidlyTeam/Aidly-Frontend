import {
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomTooltip from "../tooltip";
import { useRouter } from "next/router";

const CustomBreadcrumbs = ({ titles }) => {
  const { logout, user } = useAuth();
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
        }}
      >
        {titles.map((item, index) =>
          index == titles.length - 1 ? (
            <Typography
              key={index}
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "default",
                color: (theme) => `${theme.palette.text.primary} !important`,
              }}
            >
              {item.icon}
              {item.title}
            </Typography>
          ) : !item?.path ? (
            <Typography
              key={index}
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "default",
              }}
            >
              {item.icon}
              {item.title}
            </Typography>
          ) : (
            <Link
              underline="hover"
              key={index}
              color="inherit"
              href={item?.path}
            >
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {item.icon}
                {item.title}
              </Typography>
            </Link>
          )
        )}
      </Breadcrumbs>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomTooltip title="Settings">
            <IconButton
              onClick={() => router.push('/profile/info')}
              sx={{
                mr: { xs: 1, sm: 1, md: 1 },
                mt: { xs: 1, sm: 0 },
              }}
            >
              <SettingsIcon
                sx={{
                  color: (theme) => `${theme.palette.text.primary} !important`,
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Logout">
            <IconButton
              onClick={logout}
              sx={{
                mr: { xs: 2, sm: 1, md: 0 },
                mt: { xs: 1, sm: 0 },
              }}
            >
              <LogoutIcon
                sx={{
                  color: (theme) => `${theme.palette.text.primary} !important`,
                }}
              />
            </IconButton>
          </CustomTooltip>
        </Box>
      )}
    </Box>
  );
};

export default CustomBreadcrumbs;
