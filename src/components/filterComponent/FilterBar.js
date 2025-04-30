import React from "react";
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import SyncProblemIcon from '@mui/icons-material/SyncProblem';


const FilterBar = ({
  searchText,
  setSearchText,
  urgentFilter,
  setUrgentFilter,
  tagOptions = [],
  selectedTags,
  setSelectedTags,
}) => {
  const boxStyle = {
    backgroundColor: "#f5f6f7",
    borderRadius: "12px",
    paddingX: 2,
    paddingY: 1,
    display: "flex",
    alignItems: "center",
    height: "48px",
  };

  const placeholderStyle = {
    color: "#8a94a6",
    fontWeight: 400,
  };

  return (
    <Grid container spacing={2} alignItems="center" mb={2}>
      <Grid item xs={12} md={6}>
        <Box sx={boxStyle}>
          <SearchIcon sx={{ color: "#8a94a6", mr: 1 }} />
          <TextField
            variant="standard"
            fullWidth
            placeholder="Job title, keywords..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: {
                ...placeholderStyle,
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={2}>
        <Box sx={boxStyle}>
          <SyncProblemIcon sx={{ color: "#8a94a6", mr: 1 }} />
          <FormControl fullWidth variant="standard">
            <Select
              disableUnderline
              value={urgentFilter}
              onChange={(e) => setUrgentFilter(e.target.value)}
              displayEmpty
              inputProps={{
                style: placeholderStyle,
              }}
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Urgent Filter</em>
              </MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="urgent">Urgent Only</MenuItem>
              <MenuItem value="non-urgent">Non-Urgent</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={boxStyle}>
          <CategoryIcon sx={{ color: "#8a94a6", mr: 1 }} />
          <FormControl fullWidth variant="standard">
            <Select
              multiple
              disableUnderline
              displayEmpty
              value={selectedTags}
              onChange={(e) => setSelectedTags(e.target.value)}
              input={<OutlinedInput notched={false} />}
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              renderValue={(selected) =>
                selected.length === 0 ? (
                  <em style={placeholderStyle}>Categories</em>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((tag) => (
                      <Chip key={tag} label={tag} size="small"  color="primary"/>
                    ))}
                  </Box>
                )
              }
            >
              {tagOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={selectedTags.includes(tag)} />
                  <ListItemText primary={tag}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FilterBar;
