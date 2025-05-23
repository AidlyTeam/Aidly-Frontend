import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Button, Typography, Container, Box, Link } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo/Adsız tasarım.png";
import { postAuth, civicAuth } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import bs58 from "bs58";
import UpdateProfile from "@/components/popup/UpdateProfile";
import { useUser } from "@civic/auth/react";

const Login = () => {
  const { user, signIn, signOut, authStatus } = useUser();
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isPhantomAvailable, setIsPhantomAvailable] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side and if Phantom is available
  useEffect(() => {
    setIsClient(true);

    // Wait a moment for Phantom to initialize in the browser
    const timeoutId = setTimeout(() => {
      const checkPhantomAvailability = () => {
        const isPhantomInstalled =
          typeof window !== 'undefined' &&
          window.solana &&
          window.solana.isPhantom;

        setIsPhantomAvailable(isPhantomInstalled);
      };

      checkPhantomAvailability();

      // Check again after a brief delay to account for delayed injection
      window.addEventListener('load', checkPhantomAvailability);
      return () => {
        window.removeEventListener('load', checkPhantomAvailability);
      };
    }, 500); // Small delay to ensure DOM is fully loaded

    return () => clearTimeout(timeoutId);
  }, []);

  // Function for Phantom Wallet login
  const connectPhantom = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    // Check if Phantom is installed
    const provider = window?.phantom?.solana;
    if (!provider?.isPhantom) {
      alert("Phantom wallet not found. Please install Phantom extension.");
      return;
    }

    try {
      // Try to eagerly connect
      try {
        const resp = await provider.connect({ onlyIfTrusted: true });
      } catch (err) {
        // Request new connection
        const resp = await provider.connect();
      }

      // Verify connection
      if (!provider.isConnected) {
        throw new Error("Failed to connect to Phantom");
      }

      const publicKey = provider.publicKey;
      if (!publicKey) {
        throw new Error("No public key found");
      }

      const walletAddress = publicKey.toString();

      const message = `Giriş doğrulaması: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);

      const signed = await provider.signMessage(encodedMessage, "utf8");
      const signatureBase58 = bs58.encode(signed.signature);

      const payload = {
        message,
        signatureBase58,
        walletAddress,
      };

      const result = await dispatch(postAuth(payload)).unwrap();

      const user = {
        ...result,
        role: result?.data?.role,
      };

      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
      setUserData(result.data);

      if (result.data?.role === "first" || result.data?.name === "" || result.data?.surname === "") {
        setShowUpdateProfile(true);
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Phantom error:", err);
      if (err.code === 4001) {
        alert("Connection rejected. Please approve the connection request in your Phantom wallet.");
      } else if (err.code === -32002) {
        alert("Connection request already pending. Please check your Phantom wallet.");
      } else if (err.message?.includes("already connected")) {
        // Try disconnecting and reconnecting
        try {
          await provider.disconnect();
          await provider.connect();
        } catch (reconnectErr) {
          console.error("Reconnection failed:", reconnectErr);
          alert("Failed to reconnect. Please refresh the page and try again.");
        }
      } else {
        alert(`Failed to connect to Phantom wallet: ${err.message || 'Unknown error'}`);
      }
    }
  };




  // Profile update handler
  const handleProfileUpdate = () => {
    setShowUpdateProfile(false);
    router.push("/home");
  };

  const connectWithCivic = async () => {
    try {
      const payload = {
        fullName: user.name,
        email: user.email,
      };

      const result = await dispatch(civicAuth(payload)).unwrap();

      const userMap = {
        ...result,
        role: result?.data?.role,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem("userData", JSON.stringify(userMap));
      }
      setUser(userMap);
      setUserData(result.data);
      if (result.data?.role === "first" || result.data?.name === "" || result.data?.surname === "") {
        setShowUpdateProfile(true);
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Civic connection error:", err);
    }
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.crypto?.subtle &&
      user
    ) {
      connectWithCivic();
    }
  }, [user]);







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
          {isClient && !isPhantomAvailable
            ? "Phantom wallet is not detected. Please install it to continue."
            : "Connect your Phantom wallet to access the app. Don't have one? Get it from the official site."}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {isClient && !isPhantomAvailable ? (
            <Button
              variant="contained"
              onClick={() => {
                window.open("https://phantom.app/", "_blank");
              }}
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
              Install Phantom Wallet
            </Button>
          ) : (
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
          )}
          <Button
            variant="contained"
            onClick={() => {
              if (typeof window !== "undefined" && window.crypto?.subtle) {
                signIn();
              } else {
                alert("Civic authentication requires a secure browser environment.");
              }
            }}
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
            Connect With Civic
          </Button>
        </Box>
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
