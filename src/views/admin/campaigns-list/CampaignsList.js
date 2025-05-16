import ClassicTable from "@/components/table/ClassicTable";
import { organizationListColumn } from "@/components/table/column/organizationListColumn";
import { getCampaignsForAdmin } from "@/store/admin/campaign";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrganizationList = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleRowClick = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    const selectedRow = campaigns.find((row) => row.id === id);
    if (selectedRow) {
      setSelectedCampaign(selectedRow);
    }
  };
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { campaign: campaignSlice } = useSelector((state) => state.admin);
  const campaigns = campaignSlice?.data?.data;

  useEffect(() => {
    dispatch(getCampaignsForAdmin());
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Campaign List
        </Typography>
        <Typography variant="body1">
          This is the campaign list page. You can manage campaigns from here.
        </Typography>
        <Typography variant="body1">
          You can add, edit, delete and verifed campaigns from this page.
        </Typography>
      </Box>
      <ClassicTable
        rows={campaigns}
        columns={organizationListColumn}
        pagination={{
          page,
          pageCount: Math.ceil(campaignSlice?.data?.data?.length / 7),
          setPage,
        }}
        onRowClick={(row) => handleRowClick(row?.id)}
        enableCheckbox
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </Box>
  );
};

export default OrganizationList;
