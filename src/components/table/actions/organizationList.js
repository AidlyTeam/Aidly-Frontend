import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
const OrganizationActions = ({ row }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [isVerified, setIsVerified] = useState(row.isVerified);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Delete action triggered");
  };

  return (
    <>
      <Tooltip title="Detay">
        <IconButton onClick={() => router.push(`/admin/organization-list/${row.id}`)}>
          <Visibility />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sil">
        <IconButton onClick={() => setOpenDelete(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={isVerified ? "Verify" : " Unverify"}
        arrow
        sx={{
          color: isVerified ? "green" : "red",
          "&:hover": {
            color: isVerified ? "darkgreen" : "darkred",
          },
        }}
      >
        <IconButton
          onClick={() => {
            setIsVerified(!isVerified);
            
          }}
        >
          {isVerified ? <UnpublishedIcon /> : <TaskAltIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default OrganizationActions;
