import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export const createBadge = createAsyncThunk(
  "admin/createBadge",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('donationThreshold', data.donationThreshold);
      if (data.imageFile) {
        formData.append('imageFile', data.imageFile);
      }

      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getBadges = createAsyncThunk(
  "admin/getBadges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getBadgeById = createAsyncThunk(
  "admin/getBadgeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBadge = createAsyncThunk(
  "admin/updateBadge",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('donationThreshold', data.donationThreshold);
      if (data.imageFile) {
        formData.append('imageFile', data.imageFile);
      }

      const response = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge/${id}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteBadge = createAsyncThunk(
  "admin/deleteBadge",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const badgeSlice = createSlice({
  name: "badges",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBadge.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createBadge.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(createBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(getBadges.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(getBadgeById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBadgeById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getBadgeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(updateBadge.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateBadge.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(updateBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(deleteBadge.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteBadge.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(deleteBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      });
  },
});

export default badgeSlice.reducer;