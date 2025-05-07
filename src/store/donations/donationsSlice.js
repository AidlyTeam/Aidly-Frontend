import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export const createDonationForCampaign = createAsyncThunk(
  "donations/createDonation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/donations`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const donationsSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDonationForCampaign.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createDonationForCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(createDonationForCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      });
  },
});

export default donationsSlice.reducer; 