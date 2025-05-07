import DonateList from "@/components/donate-list/DonateList";
import FilterBar from "@/components/filterComponent/FilterBar";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "@/store/category/categorySlice";
import { getCampaign } from "@/store/campaign/campaignSlice";

const DonatePages = () => {
  const [searchText, setSearchText] = useState("");
  const [urgentFilter, setUrgentFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  const { category: categorySlice } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCampaign());
  }, [dispatch]);

  const categoryData = categorySlice.data.data?.categories || [];

  const { campaign: campaignSlice } = useSelector((state) => state);

  const donations = Array.isArray(campaignSlice?.data?.data) ? campaignSlice?.data?.data : [];

  return (
    <Box>
      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        urgentFilter={urgentFilter}
        setUrgentFilter={setUrgentFilter}
        tagOptions={categoryData}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {campaignSlice.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <DonateList donations={donations} />
      )}
    </Box>
  );
};

export default DonatePages;
