import { Box, Typography, Chip } from "@mui/material";
import Image from "next/image";
import NFTListActions from "../actions/nftLİst";

export const nftListColumn = [
  {
    field: "imageUrl",
    headerName: "Image",
    flex: 0.3,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              transform: "scale(1.1)",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          <img
            src={`/api/${row.iconPath}`}
            alt={row.name}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "isNft",
    headerName: "Type",
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.row.isNft ? "NFT" : "Badge"}
        color={params.row.isNft ? "primary" : "secondary"}
        size="small"
      />
    ),
  },
  {
    field: "sellerFee",
    headerName: "Seller Fee",
    width: 120,
 
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 120,

  },
  {
    field: "threshold",
    headerName: "Donation Threshold",
    width: 150,
  },
  {
    flex: 0.1,
    minWidth: 152,
    headerName: "Actions",
    field: "actions",
    renderCell: (params) => <NFTListActions row={params.row} />,
  },
]; 