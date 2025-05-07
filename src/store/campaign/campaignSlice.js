import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};


export const getCampaign = createAsyncThunk(
  "campaign/getCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
     
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const getCampaignById = createAsyncThunk(
  "campaign/getCampaignById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
     
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      });
     
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaign/updateCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          if (key === 'imageFile' && data[key]) {
            formData.append(key, data[key]);
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      const response = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data.campaignID}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
     
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  "campaign/deleteCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
     
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const addCategoryToCampaign = createAsyncThunk(
  "campaign/addCategoryToCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data.id}/category`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const removeCategoryFromCampaign = createAsyncThunk(
  "campaign/removeCategoryFromCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({    
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data.id}/category`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const isValidCampaign = createAsyncThunk(
  "campaign/isValidCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data}/isValid`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCampaignById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCampaignById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addCategoryToCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoryToCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addCategoryToCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(removeCategoryFromCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCategoryFromCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(removeCategoryFromCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(isValidCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(isValidCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(isValidCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});

export default campaignSlice.reducer;