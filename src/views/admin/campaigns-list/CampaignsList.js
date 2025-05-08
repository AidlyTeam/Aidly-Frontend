import ClassicTable from "@/components/table/ClassicTable";
import { organizationListColumn } from "@/components/table/column/organizationListColumn";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const OrganizationList = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleRowClick = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    const selectedRow = apiData.find((row) => row.id === id);
    if (selectedRow) {
      setSelectedApplication(selectedRow);
    }
  };
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [apiData, setApiData] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      organization_name: "Tech Corp",
      donate_count: 100,
      total_donate: 300,
      total_donate_count: 5,
      isVerified: true,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      organization_name: "Health Inc",
      donate_count: 200,
      total_donate: 400,
      total_donate_count: 10,
      isVerified: false,
    },
    {
      id: 3,
      first_name: "Alice",
      last_name: "Johnson",
      organization_name: "Edu Foundation",
      donate_count: 150,
      total_donate: 350,
      total_donate_count: 7,
      isVerified: true,
    },
    {
      id: 4,
      first_name: "Bob",
      last_name: "Brown",
      organization_name: "Enviro NGO",
      donate_count: 250,
      total_donate: 450,
      total_donate_count: 12,
      isVerified: false,
    },
    {
      id: 5,
      first_name: "Charlie",
      last_name: "Davis",
      organization_name: "Food Bank",
      donate_count: 300,
      total_donate: 500,
      total_donate_count: 15,
      isVerified: true,
    },
    {
      id: 6,
      first_name: "Eve",
      last_name: "Wilson",
      organization_name: "Animal Rescue",
      donate_count: 350,
      total_donate: 550,
      total_donate_count: 20,
      isVerified: false,
    },
    {
      id: 7,
      first_name: "Frank",
      last_name: "Garcia",
      organization_name: "Community Center",
      donate_count: 400,
      total_donate: 600,
      total_donate_count: 25,
      isVerified: true,
    },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);

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
        rows={apiData}
        columns={organizationListColumn}
        pagination={{
          page,
          pageCount: Math.ceil(totalCount / 7),
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
