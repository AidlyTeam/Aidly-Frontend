import DonateList from "@/components/donate-list/DonateList";
import FilterBar from "@/components/filterComponent/FilterBar";
import NotFound from "@/components/not-found/NotFound";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "@/store/category/categorySlice";
import { getCampaign } from "@/store/campaign/campaignSlice";

const DonatePages = () => {
  const [filters, setFilters] = useState({
    search: "",
    isVerified: "",
    page: "1",
    limit: "10",
    categoryIds: []
  });
  const dispatch = useDispatch();

  const { category: categorySlice, campaign: campaignSlice } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    // Build query string
    const queryParams = new URLSearchParams();
    
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    
    if (filters.isVerified) {
      queryParams.append('isVerified', filters.isVerified);
    }
    
    if (filters.page) {
      queryParams.append('page', filters.page);
    }
    
    if (filters.limit) {
      queryParams.append('limit', filters.limit);
    }
    
    if (filters.categoryIds.length > 0) {
      queryParams.append('categoryIds', filters.categoryIds.join(','));
    }

    dispatch(getCampaign(queryParams.toString()));
  }, [dispatch, filters]);

  const categoryData = categorySlice.data.data?.categories || [];
  const donations = Array.isArray(campaignSlice?.data?.data) ? campaignSlice?.data?.data : [];

  const handleSearchChange = (value) => {
    setFilters(prev => ({
      ...prev,
      search: value,
      page: "1"
    }));
  };

  const handleVerifiedChange = (value) => {
    setFilters(prev => ({
      ...prev,
      isVerified: value,
      page: "1"
    }));
  };

  const handleCategoryChange = (selectedCategories) => {
    setFilters(prev => ({
      ...prev,
      categoryIds: selectedCategories.map(cat => cat.id),
      page: "1"
    }));
  };

  return (
    <Box>
      <FilterBar
        searchText={filters.search}
        setSearchText={handleSearchChange}
        urgentFilter={filters.isVerified}
        setUrgentFilter={handleVerifiedChange}
        tagOptions={categoryData}
        selectedTags={filters.categoryIds.map(id => categoryData.find(cat => cat.id === id)).filter(Boolean)}
        setSelectedTags={handleCategoryChange}
      />

      {campaignSlice.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : donations.length > 0 ? (
        <DonateList donations={donations} />
      ) : (
        <NotFound message="No campaigns found matching your criteria" />
      )}
    </Box>
  );
};

export default DonatePages;
