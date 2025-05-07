import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addCategoryToCampaign, removeCategoryFromCampaign, getCampaignById } from "@/store/campaign/campaignSlice";
import { getCategory } from "@/store/category/categorySlice";

const CampaignCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { campaign: campaignSlice, category: categorySlice } = useSelector((state) => state);
  const categories = categorySlice?.data?.data?.categories || [];
  const campaignCategories = campaignSlice?.data?.data?.categories?.categories || [];
  console.log('Campaign Categories:', campaignCategories);

  useEffect(() => {
    if (id) {
      dispatch(getCategory());
      dispatch(getCampaignById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (campaignCategories.length > 0) {
      setSelectedCategories(campaignCategories.map(cat => cat.id));
    }
  }, [campaignCategories]);

  const handleAddCategory = async (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      return;
    }

    try {
      setLoading(true);
      await dispatch(addCategoryToCampaign({
        id,
        categoryID: categoryId
      }));
      setSelectedCategories([...selectedCategories, categoryId]);
      // Refresh campaign data after adding category
      dispatch(getCampaignById(id));
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      setLoading(true);
      await dispatch(removeCategoryFromCampaign({
        id,
        categoryID: categoryId
      }));
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      // Refresh campaign data after removing category
      dispatch(getCampaignById(id));
    } catch (error) {
      console.error("Error removing category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    router.push('/profile/my-organizations');
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: "0 0 25px rgba(0,255,163,0.2)",
        mx: "auto",
        mt: 4,
        color: "#fff",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="secondary">
          🏷️ Campaign Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: "linear-gradient(to right, #63f1f9, #72F088)",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0 0 20px #63f1f9",
          }}
        >
          Add Category
        </Button>
      </Box>

      <Grid container spacing={2}>
        {selectedCategories.map((categoryId) => {
          const category = categories.find(cat => cat.id === categoryId);
          return (
            <Grid item key={categoryId}>
              <Chip
                label={category?.name}
                onDelete={() => handleRemoveCategory(categoryId)}
                deleteIcon={<DeleteIcon />}
                sx={{
                  backgroundColor: "rgba(99, 241, 249, 0.1)",
                  color: "secondary.main",
                  border: "1px solid",
                  borderColor: "secondary.main",
                  "& .MuiChip-deleteIcon": {
                    color: "secondary.main",
                    "&:hover": {
                      color: "error.main",
                    },
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            color: "#fff",
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle sx={{ color: "secondary.main", fontWeight: "bold" }}>
          Select Categories
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {categories.map((category) => (
              <Grid item key={category.id}>
                <Chip
                  label={category.name}
                  onClick={() => handleAddCategory(category.id)}
                  disabled={selectedCategories.includes(category.id)}
                  sx={{
                    backgroundColor: selectedCategories.includes(category.id)
                      ? "secondary.main"
                      : "rgba(99, 241, 249, 0.1)",
                    color: selectedCategories.includes(category.id)
                      ? "#000"
                      : "secondary.main",
                    border: "1px solid",
                    borderColor: "secondary.main",
                    "&:hover": {
                      backgroundColor: selectedCategories.includes(category.id)
                        ? "secondary.main"
                        : "rgba(99, 241, 249, 0.2)",
                    },
                    "&.Mui-disabled": {
                      opacity: 0.7,
                      backgroundColor: "secondary.main",
                      color: "#000",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "rgba(99, 241, 249, 0.1)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            background: "linear-gradient(to right, #63f1f9, #72F088)",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0 0 20px #63f1f9",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </Box>
    </Card>
  );
};

export default CampaignCategories; 