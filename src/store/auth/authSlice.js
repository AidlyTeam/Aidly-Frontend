import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const postAuth = createAsyncThunk(
  "auth/postAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/public/auth`,
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

export const civicAuth = createAsyncThunk(
  "auth/civicAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/public/auth/civic`,
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postAuth.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(civicAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(civicAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(civicAuth.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
