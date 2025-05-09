import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Button, Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo/Adsız tasarım.png";
import { postAuth } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import bs58 from 'bs58';
import UpdateProfile from "@/components/popup/UpdateProfile";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [userData, setUserData] = useState(null);

  const connectPhantom = async () => {
    if (!window.solana?.isPhantom) {
      alert("Phantom wallet not found. Please install the Phantom extension.");
      return;
    }

    try {
      const resp = await window.solana.connect();
      const walletAddress = resp.publicKey.toString();
      const message = `Giriş doğrulaması: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signed = await window.solana.signMessage(encodedMessage, "utf8");

      const signatureBase58 = bs58.encode(signed.signature);

      const payload = {
        message,
        signatureBase58,
        walletAddress,
      };
      console.log("Payload:", payload);
      const result = await dispatch(postAuth(payload)).unwrap();

      const user = {
        ...result,
        role: result?.data?.role,
      };

      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
      setUserData(result.data);

      if (result.data?.role === "first") {
        setShowUpdateProfile(true);
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Phantom connection error:", err);
    }
  };

  const handleProfileUpdate = () => {
    setShowUpdateProfile(false);
    router.push("/home");
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF", // Beyaz arka plan
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src={logo}
        alt="Logo"
        layout="intrinsic"
        width={150}
        height={150}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          zIndex: 2,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          p: 4,
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
          background: "linear-gradient(135deg, rgba(21, 184, 29, 0.4), rgba(99, 241, 249, 0.2))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 40px rgba(99, 241, 249, 0.4), 0 0 10px rgba(21, 184, 29, 0.4)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 0 60px rgba(99, 241, 249, 0.5), 0 0 20px rgba(21, 184, 29, 0.5)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-75%",
            width: "200%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
            transform: "skewX(-20deg)",
            animation: "shineContainer 3s infinite",
          },
          "@keyframes shineContainer": {
            "0%": { left: "-75%" },
            "50%": { left: "125%" },
            "100%": { left: "125%" },
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#15B81D", fontWeight: "bold" }}
        >
          Login With Phantom Wallet
        </Typography>

        <Typography
          variant="body1"
          mb={4}
          sx={{ color: "#333", fontSize: "1.1rem" }}
        >
          Connect your Phantom wallet to access the app. Don't have one? Get it from the official site.
        </Typography>

        <Button
          variant="contained"
          onClick={connectPhantom}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "12px",
            background: "linear-gradient(to right, #63f1f9, #72F088)",
            color: "#000",
            boxShadow: "0 0 20px #63f1f9",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 25px #72F088",
            },
          }}
        >
          Connect Phantom
        </Button>
      </Container>

      <UpdateProfile
        open={showUpdateProfile}
        onClose={handleProfileUpdate}
        isDefault={false}
      />
    </Box>
  );
};

Login.guestGuard = true;
Login.getLayout = (page) => <>{page}</>;

export default Login;
