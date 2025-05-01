// ** React Imports
import { useState } from "react";
// ** MUI Imports
import { CircularProgress, Box, Pagination, Typography } from "@mui/material";
// ** Custom Components
import { hexToRGBA } from "../../utils/hex-to-rgba";
import { theme } from "@/configs/theme";
import CustomNoRowsOverlay from "./elements/CustomNoRowsOverlay";
import { DataGrid } from "@mui/x-data-grid";

/**
 * @param {*} props
 * @param rows {Array} - Data @required
 * @param columns {Array} - Columns @required
 * @param getRowId {Function} - @example (row) => row.id (if not provided, row.id will be used)
 * @param count {Number} - Total Count @optional
 * @param enableCheckbox {Boolean} - Enable Checkbox @optional
 */

const ClassicTable = (props) => {
  const {
    rows,
    columns,
    enableCheckbox = false,
    enableFooter = false,
    getRowId = (row) => row.id,
    header = null,
    actions = null,
    pagination = {
      page: 1,
      pageCount: 1,
      setPage: () => {},
    },
    isAlert = false,
  } = props;

  // ** States
  const [pageSize, setPageSize] = useState(10);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "8px",
        }}
      >
        <Typography variant="h4" component="span">
          {header}
        </Typography>

        <Box>{actions ? actions : null}</Box>
      </Box>

      <DataGrid
        rows={rows?.length ? rows : []}
        columns={columns?.length ? columns : []}
        autoHeight
        pagination
        disableSelectionOnClick
        hideFooterPagination={!enableFooter}
        hideFooterSelectedRowCount={!enableFooter}
        pageSize={pageSize}
        checkboxSelection={enableCheckbox}
        onRowSelectionModelChange={(newSelection) => {
          props.setSelectedIds?.(newSelection);
        }}
        rowSelectionModel={props.selectedIds}
        onPageChange={(newPage) => pagination.setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={getRowId}
        onRowClick={(row) => props.onRowClick(row)}
        components={{
          Toolbar: null,
          LoadingOverlay: CircularProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
          NoResultsOverlay: CustomNoRowsOverlay,
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 1 ? "even" : "odd"
        }
        sx={{
          border: (theme) => `1px solid ${theme.palette.common.black}`,
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, 0.8),
          borderRadius: "8px",
          border: "none",

          "& .MuiDataGrid-columnHeaders": {},
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "1rem",
          },
          // "& .MuiDataGrid-cell": {
          //     maxHeight: "300px !important",
          // },
          // ".css-149d7vg-MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row": {
          //     maxHeight: "unset !important",
          // },
          ".MuiDataGrid-virtualScrollerContent": {
            minHeight: isAlert ? "40vh" : "38vh !important",
            maxHeight: "56vh !important",
            height: "auto",
            fontSize: "1rem",
          },
          "& .MuiTypography-root": {
            fontSize: "1rem",
            color: theme.palette.text.primary,
          },
          "& .MuiListItemText": {
            fontSize: "1rem",
            color: theme.palette.text.primary + "!important",
          },

          "& .odd": {
            backgroundColor: (theme) =>
              hexToRGBA(theme.palette.background.paper, 0.7),
            borderBottom: `1px dashed ${theme.palette.secondary.dark}`,
            opacity: 0.8,
          },
          "& .even": {
            backgroundColor: (theme) =>
              hexToRGBA(theme.palette.background.paper, 0.7),
            borderBottom: `1px dashed ${theme.palette.secondary.dark}`,
            opacity: 0.8,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: hexToRGBA(theme.palette.background.paper, 1),
            cursor: "pointer",
          },
          "& .MuiDataGrid-footerContainer": {
            display: enableFooter ? "undefined" : "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.text.dark}`,
            borderTop: "none",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderWrapper": {
            borderBottom: "unset",
          },
          "& .MuiDataGrid-columnHeader": {
            borderBottom: "unset",
          },
          "& MuiDataGrid-virtualScrollerContent": {},
          "& .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader": {
            borderBottom: "none",
            borderTop: "none",
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-menuIcon": {
            color: theme.palette.primary.main,
          },
          "& .MuiDataGrid-menuOpen": {
            color: theme.palette.primary.main,
          },
          "& .MuiButtonBase-root": {
            color: theme.palette.text.primary,
          },
          "& .odd.Mui-selected": {
            backgroundColor: hexToRGBA(theme.palette.background.paper, 0.9),
          },
          "& .even.Mui-selected": {
            backgroundColor: hexToRGBA(theme.palette.background.paper, 0.9),
          },
          "& .odd.Mui-selected:hover": {
            backgroundColor: hexToRGBA(theme.palette.background.paper, 0.9),
          },
          "& .even.Mui-selected:hover": {
            backgroundColor: hexToRGBA(theme.palette.background.paper, 0.9),
          },
        }}
      />

      {pagination.pageCount > 1 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px",
          }}
        >
          <Pagination
            count={pagination?.pageCount}
            page={pagination?.page}
            onChange={(e, val) => pagination.setPage(val)}
            variant="text"
            shape="rounded"
            color="primary"
            sx={{
              // seçili olmayanlkarın ve sayfa numaralarının rengi
              "& .MuiPaginationItem-root": {
                color: theme.palette.primary.main,
              },
              // seçili olan sayfanın rengi
              "& .Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ClassicTable;
