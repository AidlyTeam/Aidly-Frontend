import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomTooltip from "@/components/tooltip";


const UserActions = ({ row }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  


  return (
    <>
      <CustomTooltip title="Delete"
      
      >
        <IconButton onClick={() => setOpenDelete(true)}>
          <Delete />
        </IconButton>
      </CustomTooltip>
   
      

    </>
  );
};

export default UserActions;
