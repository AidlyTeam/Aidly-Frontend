import DonateList from "@/components/donate-list/DonateList";
import FilterBar from "@/components/filterComponent/FilterBar";
import { Box } from "@mui/material";
import React, { useState } from "react";

const DonatePages = () => {
  const [searchText, setSearchText] = useState("");
  const [urgentFilter, setUrgentFilter] = useState(""); 
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <Box>
      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        urgentFilter={urgentFilter}
        setUrgentFilter={setUrgentFilter}
        tagOptions={["Environment", "Education", "Disaster"]}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <DonateList />
    </Box>
  );
};

export default DonatePages;
