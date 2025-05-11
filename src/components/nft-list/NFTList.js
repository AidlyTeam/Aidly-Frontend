import React, { useState } from "react";
import { Box, Card, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TokenIcon from "@mui/icons-material/Token";
import { useDispatch } from "react-redux";
import { getNFtsMinted } from "@/store/nfts/nftSlice";

const NoNFTsFound = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      textAlign: "center",
      p: 4,
      animation: "fadeIn 0.5s ease-in-out",
    }}
  >
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        background:
          "linear-gradient(45deg, rgba(99, 241, 249, 0.1) 30%, rgba(114, 240, 136, 0.1) 90%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 3,
        position: "relative",
        animation: "scaleIn 0.5s ease-in-out",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#63f1f9",
          borderLeftColor: "#72F088",
          animation: "spin 3s linear infinite",
        },
      }}
    >
      <TokenIcon
        sx={{
          fontSize: 60,
          color: "secondary.main",
          opacity: 0.7,
          animation: "pulse 2s infinite",
        }}
      />
    </Box>
    <Typography variant="h5" color="secondary" fontWeight="bold" mb={2}>
      No NFTs Found
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ maxWidth: "400px" }}
    >
      Start your NFT collection by participating in campaigns and earning
      rewards. Your digital achievements await!
    </Typography>
  </Box>
);

const NFTList = ({ nfts }) => {
  const dispatch = useDispatch();
  const [hoveredNFT, setHoveredNFT] = useState(null);

  const handleClaimNFT = async (nftId) => {
    try {
      await dispatch(getNFtsMinted({ id: nftId })).unwrap();
    } catch (error) {
      console.error("Error claiming NFT:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "500px",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AutoAwesomeIcon
          sx={{
            mr: 1,
            width: 36,
            height: 36,
          }}
        />
        My NFTs
      </Typography>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(99, 241, 249, 0.5), 0 0 10px rgba(114, 240, 136, 0.5); }
            50% { box-shadow: 0 0 20px rgba(99, 241, 249, 0.8), 0 0 30px rgba(114, 240, 136, 0.8); }
            100% { box-shadow: 0 0 5px rgba(99, 241, 249, 0.5), 0 0 10px rgba(114, 240, 136, 0.5); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
        `}
      </style>

      {!nfts || nfts.length === 0 ? (
        <NoNFTsFound />
      ) : (
        <Grid container spacing={3}>
          {nfts.map((nft, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onMouseEnter={() => setHoveredNFT(nft.id)}
                onMouseLeave={() => setHoveredNFT(null)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(45deg, rgba(99, 241, 249, 0.1) 30%, rgba(114, 240, 136, 0.1) 90%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  overflow: "hidden",
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    animation: "glow 2s infinite",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    paddingBottom: "100%",
                    mb: 2,
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(45deg, rgba(99, 241, 249, 0.1) 30%, rgba(114, 240, 136, 0.1) 90%)",
                    filter: !nft.isMinted ? "blur(4px)" : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <img
                    component="img"
                    src={`/api/${nft.iconPath}`}
                    alt={nft.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                </Box>
                <Typography variant="h6" color="secondary" fontWeight="bold">
                  {nft.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {nft.description}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="secondary">
                    #{nft.symbol}
                  </Typography>
                  <Typography variant="body2" color="info.main" 
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      justifyContent: "flex-end",
                    }}
                  >
                    {nft.sellerFee}{" "}
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 24,
                        height: 24,
                      }}
                    >
                      <Image
                        src="/solana-sol-icon.svg"
                        alt="Solana"
                        width={22}
                        height={22}
                      />
                    </Box>
                  </Typography>
                </Box>

                {!nft.isMinted && hoveredNFT === nft.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, rgba(99, 241, 249, 0.2) 0%, rgba(114, 240, 136, 0.2) 100%)",
                      backdropFilter: "blur(8px)",
                      zIndex: 2,
                      animation: "fadeIn 0.3s ease-in-out",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                        animation: "shimmer 2s infinite",
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleClaimNFT(nft.id)}
                      sx={{
                        background: "linear-gradient(45deg, #63f1f9 30%, #72F088 90%)",
                        color: "#000",
                        padding: "12px 32px",
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        boxShadow: "0 0 20px rgba(99, 241, 249, 0.5)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                          animation: "shimmer 2s infinite",
                        },
                        "&:hover": {
                          background: "linear-gradient(45deg, #63f1f9 40%, #72F088 100%)",
                          boxShadow: "0 0 30px rgba(99, 241, 249, 0.7)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Claim Your NFT
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default NFTList;
