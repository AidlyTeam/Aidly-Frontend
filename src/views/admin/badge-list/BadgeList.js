import ClassicTable from "@/components/table/ClassicTable";
import { Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { badgeListColumn } from "@/components/table/column/badgeListColumn";
import { getBadges } from "@/store/admin/badge";

const BadgeList = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { badge: badgeSlice } = useSelector((state) => state.admin);
  const badges = badgeSlice?.data?.data?.badges;

  useEffect(() => {
    dispatch(getBadges());
  }, [dispatch]);

  const handleRowClick = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddBadge = () => {
    router.push("/admin/badge-list/new");
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Badge List
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Manage your badges here. You can create, edit, and delete badges.
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
            onClick={handleAddBadge}
          >
            Add New Badge
          </Button>
        </Box>
      </Box>
      <ClassicTable
        rows={badges || []}
        columns={badgeListColumn}
        pagination={{
          page,
          pageCount: Math.ceil(badgeSlice?.data?.data?.totalCount / 7),
          setPage,
        }}
        onRowClick={(row) => handleRowClick(row?.id)}
        enableCheckbox
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        // loading={loading}
      />
    </Box>
  );
};

export default BadgeList;
