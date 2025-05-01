import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";


const UserActions = ({ row }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  


  return (
    <>
      <Tooltip title="Detay">
      </Tooltip>
      <Tooltip title="Sil">
        <IconButton onClick={() => setOpenDelete(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
   
      

    </>
  );
};

export default UserActions;
