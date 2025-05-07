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
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import { theme } from "@/configs/theme";

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
            placeholder="Search campaigns..."
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
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(99, 241, 249, 0.1)",
                          border: "1px solid rgba(99, 241, 249, 0.3)",
                        }}
                      />
                    ))}
                  </Box>
                )
              }
            >
              {tagOptions.map((tag) => (
                <MenuItem key={tag.id} value={tag}>
                  <Checkbox 
                    checked={selectedTags.some(selectedTag => selectedTag.id === tag.id)}
                    sx={{
                      color: "#63f1f9",
                      "&.Mui-checked": {
                        color: "#63f1f9",
                      },
                    }}
                  />
                  <ListItemText 
                    primary={
                      <Typography sx={{  }}>
                        {tag.name}
                      </Typography>
                    } 
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
