import ClassicTable from "@/components/table/ClassicTable";
import { Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { nftListColumn } from "@/components/table/column/nftListColumn";
import { getNFTs } from "@/store/admin/nft";

const NFTList = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { nft: nftSlice } = useSelector((state) => state.admin);
  const nfts = nftSlice?.data?.data?.badges;

  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  const handleRowClick = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddNFT = () => {
    router.push("/admin/nft-list/new");
  };


  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          NFT List
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Manage your NFTs here. You can create, edit, and delete NFTs.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNFT}
          >
            Add New NFT
          </Button>
        </Box>
      </Box>
      <ClassicTable
        rows={nfts || []}
        columns={nftListColumn}
        pagination={{
          page,
          pageCount: Math.ceil(nftSlice?.data?.data?.totalCount / 7),
          setPage,
        }}
        onRowClick={(row) => handleRowClick(row?.id)}
        enableCheckbox
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        loading={nftSlice?.loading}
      />
    </Box>
  );
};

export default NFTList; 