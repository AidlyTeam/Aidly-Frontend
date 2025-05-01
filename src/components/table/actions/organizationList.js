import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CustomTooltip from "@/components/tooltip";
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
      <CustomTooltip title="View">
        <IconButton onClick={() => router.push(`/admin/organization-list/${row.id}`)}>
          <Visibility />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Delete">
        <IconButton onClick={() => setOpenDelete(true)}>
          <Delete />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip
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
      </CustomTooltip>
    </>
  );
};

export default OrganizationActions;
