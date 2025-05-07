import { Box, Card, CardContent } from "@mui/material";
import NavigationList from "./navigation";
import Image from "next/image";
import logo from "../../assets/logo/Adsız tasarım.png";

const Navbar = () => {
  return (
    <Card
      sx={{
        width: "300px",
        position: "relative",
        height: "100vh",
      }}
    >
      <Box></Box>

      <CardContent
        sx={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          position: "relative",
          overflow: "auto",
          pt: "36px",
        }}
      >
        <Box sx={{ height: "auto" }}>
          <NavigationList />
          <Box sx={{ height: "100px" }}></Box>
        </Box>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          textAlign: "center",
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          style={{
            width: "50%",
            height: "auto",
            objectFit: "contain",
          }}
        />
    
      </Box>
    </Card>
  );
};

export default Navbar;
