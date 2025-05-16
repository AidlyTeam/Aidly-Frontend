import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomTooltip from "../tooltip";
import { useRouter } from "next/router";
import { useUser } from "@civic/auth/react";
import { useDispatch } from "react-redux"
import { showToast } from "@/utils/showToast";
import { getLogout } from "@/store/auth/authSlice";

const CustomBreadcrumbs = ({ titles }) => {
  const { user, setUser, setLoading, setIsInitialized } = useAuth();
  const router = useRouter();
  const { signOut } = useUser();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Backend logout
      await dispatch(getLogout()).unwrap();
      await signOut();

      // Local clear
      localStorage.removeItem("userData");
      localStorage.removeItem("user");
      setUser(null);
      setIsInitialized(false);

      // Toast
      showToast("dismiss");
      showToast("loading", "Leaving the app");

      // Delay eklersen Civic'in çıkışı kesinleşir
      await new Promise((res) => setTimeout(res, 500)); // Yarım saniyelik gecikme

      router.replace("/login"); // Eğer Civic yönlendirme yapmıyorsa burası çalışır
    } catch (error) {
      console.error("Logout error:", error);
      showToast("error", "Error While Logging Out!");
    } finally {
      setLoading(false);
    }
  };


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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomTooltip title="Settings">
            <IconButton
              onClick={() => router.push("/profile/info")}
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
              onClick={handleLogout}
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
