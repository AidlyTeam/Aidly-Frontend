// ** MUI Imports
import { showDatetime } from "@/utils/timeOptions";
import { Typography, Box } from "@mui/material";
import BasvuruDetayActions from "../actions/userList";
import CustomTooltip from "@/components/tooltip";
import UserActions from "../actions/userList";
import BadgeActions from "../actions/badgeList";

export const badgeListColumn = [
  {
    field: "imageUrl",
    headerName: "Image",
    flex: 0.3,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              transform: "scale(1.1)",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          <img
            src={`/api/${row.iconPath}`}
            alt={row.name}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.name} placement="top" arrow sx={{}}>
          <Typography
            variant="body1"
            sx={{
              cursor: "default",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "text.primary",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {row.name || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.description} placement="top" arrow sx={{}}>
          <Typography
            variant="body1"
            sx={{
              cursor: "default",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "text.primary",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {row.description || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "donationThreshold",
    headerName: "Donation Threshold",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.threshold} placement="top" arrow sx={{}}>
          <Typography
            variant="body1"
            sx={{
              cursor: "default",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "text.primary",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {row.threshold || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
 
  {
    flex: 0.1,
    minWidth: 152,
    headerName: "Actions",
    field: "actions",
    renderCell: (params) => <BadgeActions row={params.row} />,
  },
];
