import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "@/utils/showToast";

const initialState = {
  loading: false,
  error: false,
  data: {
    data: {
      donations: []
    }
  }
};

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
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message || error.message);
    }
  }
);

export const createDonationForCampaign = createAsyncThunk(
  "donations/createDonationForCampaign",
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

const donationsSlice = createSlice({
  name: "donations",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDonationsForCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonationsForCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDonationsForCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createDonationForCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonationForCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const newDonation = action.payload?.data || action.payload;
        if (state.data?.data?.donations) {
          state.data.data.donations = [...state.data.data.donations, newDonation];
        } else {
          state.data = {
            data: {
              donations: [newDonation]
            }
          };
        }
        showToast("dismiss");
        showToast("success", "Donation created successfully");
      })
      .addCase(createDonationForCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast("dismiss");
        showToast("error", action.payload);
      });
  },
});

export default donationsSlice.reducer;
