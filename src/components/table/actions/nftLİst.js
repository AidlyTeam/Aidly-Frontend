import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteBadge, getBadges } from "@/store/admin/badge";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CustomTooltip from "@/components/tooltip";

const NFTListActions = ({ row }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [isVerified, setIsVerified] = useState(row.isVerified);

  const handleEdit = () => {
    router.push(`/admin/nft-list/${row.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this badge?")) {
      try {
        await dispatch(deleteBadge(row.id)).unwrap();
        dispatch(getBadges());
      } catch (error) {
      }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1,height: "100%" }}>
      <Tooltip title="Edit">
        <IconButton onClick={handleEdit} color="primary" size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      </Tooltip>

    </Box>
  );
};

export default NFTListActions;
