import ClassicTable from "@/components/table/ClassicTable";
import { userListColumn } from "@/components/table/column/userListColumn";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const UserList = () => {
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
      mail: "jhondoe@gmail.com",
      total_donate: 100,
      total_donate_count: 5,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      mail: "dneme@gmail.com",
      total_donate: 200,
      total_donate_count: 10,
    },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>
        <Typography variant="body1">
          This is the user list page. You can manage users from here.
        </Typography>
      </Box>
      <ClassicTable
        rows={apiData}
        columns={userListColumn}
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

export default UserList;
