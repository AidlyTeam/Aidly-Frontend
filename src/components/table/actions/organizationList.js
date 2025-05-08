import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CustomTooltip from "@/components/tooltip";
import {
  changeVerificationStatus,
  deleteCampaign,
  getCampaignsForAdmin,
} from "@/store/admin/campaign";

const OrganizationActions = ({ row }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [isVerified, setIsVerified] = useState(row.isVerified);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this badge?")) {
      try {
        await dispatch(deleteCampaign(row.id)).unwrap();
        dispatch(getCampaignsForAdmin());
      } catch (error) {}
    }
  };

  const handleVerify = async () => {
    try {
      const newVerificationStatus = !isVerified;
      await dispatch(
        changeVerificationStatus({
          campaignID: row.id,

          isVerified: newVerificationStatus,
        })
      ).unwrap();
      setIsVerified(newVerificationStatus);
      dispatch(getCampaignsForAdmin());
    } catch (error) {
      console.error("Verification status change failed:", error);
    }
  };


  return (
    <>
      <CustomTooltip title="View">
        <IconButton
          onClick={() => router.push(`/admin/campaigns-list/${row.id}`)}
        >
          <Visibility />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Delete">
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip
        title={isVerified ? "Unverify" : "Verify"}
        arrow
        sx={{
          color: isVerified ? "green" : "red",
          "&:hover": {
            color: isVerified ? "darkgreen" : "darkred",
          },
        }}
      >
        <IconButton onClick={handleVerify}>
          {isVerified ? <UnpublishedIcon color="error" /> : <TaskAltIcon color="primary.dark" />}
        </IconButton>
      </CustomTooltip>
    </>
  );
};

export default OrganizationActions;
