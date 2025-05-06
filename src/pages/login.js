import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Button, Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo/Adsız tasarım.png";
import { postAuth } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import bs58 from 'bs58';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();

 
const connectPhantom = async () => {
  if (!window.solana?.isPhantom) {
    alert("Phantom Wallet bulunamadı. Lütfen Phantom eklentisini kurun.");
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

    const result = await dispatch(postAuth(payload)).unwrap();

    const user = {
      ...result,
      role: "user",
    };

    localStorage.setItem("userData", JSON.stringify(user));
    setUser(user);
    router.push("/");
  } catch (err) {
    console.error("Phantom bağlantı hatası:", err);
  }
};

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0A0C10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src={logo}
        alt="Logo"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{
          filter: "blur(20px)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(10, 12, 16, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 25px rgba(99, 241, 249, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#63f1f9", fontWeight: "bold" }}
        >
          Login With Phantom Wallet
        </Typography>

        <Typography
          variant="body1"
          mb={4}
          sx={{ color: "#8997AC", fontSize: "1.1rem" }}
        >
          Connect your Phantom wallet to access the application. If you don't have a Phantom wallet, please install it from the official website.
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
    </Box>
  );
};

Login.guestGuard = true;
Login.getLayout = (page) => <>{page}</>;

export default Login;
