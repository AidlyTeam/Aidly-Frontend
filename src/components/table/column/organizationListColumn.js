// ** MUI Imports
import { Typography } from "@mui/material";
import CustomTooltip from "@/components/tooltip";
import OrganizationActions from "../actions/organizationList";

export const organizationListColumn = [
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
    field: "title",
    headerName: "Organization Name",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip
          title={row.title}
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
            {row.title || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "raisedAmount",
    headerName: "Total Donation",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip title={row.raisedAmount} placement="top" arrow sx={{}}>
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
            {row.raisedAmount || "-"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "total_donate",
    headerName: "Required Amount",
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
            {row.targetAmount - row.raisedAmount || "0"}
          </Typography>
        </CustomTooltip>
      );
    },
  },
  {
    field: "raisedAmount",
    headerName: "Total Donation Count",
    flex: 0.45,
    minWidth: 100,
    renderCell: (params) => {
      const { row } = params;

      return (
        <CustomTooltip
          title={row.raisedAmount}
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
            {row.raisedAmount || "-"}
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
    renderCell: (params) => <OrganizationActions row={params.row} />,
  },
];
