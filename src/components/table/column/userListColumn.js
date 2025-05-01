// ** MUI Imports
import { showDatetime } from "@/utils/timeOptions";
import { Typography } from "@mui/material";
import BasvuruDetayActions from "../actions/userList";
import CustomTooltip from "@/components/tooltip";
import UserActions from "../actions/userList";

export const userListColumn = [
  {
    field: "user_name",
    headerName: "Name & Surname",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;
      const fullName = `${row.first_name} ${row.last_name}`;

      return (
        <CustomTooltip title={fullName} placement="top" arrow sx={{}}>
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
            {fullName || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "mail",
    headerName: "E-mail",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.mail} placement="top" arrow sx={{}}>
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
            {row.mail || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "total_donate",
    headerName: "Total Donation",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.total_donate} placement="top" arrow sx={{}}>
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
            {row.total_donate || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "total_donate_count",
    headerName: "Total Donation Count",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip
          title={row.total_donate_count}
          placement="top"
          arrow
          sx={{}}
        >
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
            {row.total_donate_count || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 152,
    headerName: "İşlemler",
    field: "actions",
    renderCell: (params) => <UserActions row={params.row} />,
  },
];
