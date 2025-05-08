import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: [], // donations dizisi doğrudan burada tutuluyor
};

export const createDonationForCampaign = createAsyncThunk(
  "donations/createDonation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/donation`,
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

export const getDonationsForCampaign = createAsyncThunk(
  "donations/getDonationsForCampaign",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/donation`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data; // doğrudan donations dizisi döndüğü varsayılıyor
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
        state.data = [...state.data, action.payload]; // ekleme
        state.error = false;
      })
      .addCase(createDonationForCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(getDonationsForCampaign.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDonationsForCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // doğrudan dizi
        state.error = false;
      })
      .addCase(getDonationsForCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default donationsSlice.reducer;
