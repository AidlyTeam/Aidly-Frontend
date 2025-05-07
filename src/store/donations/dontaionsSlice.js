import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};


export const createDonationForCampaign = createAsyncThunk(
  "donations/createDonationForCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/donation/create`,
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

const dontaionsSlice = createSlice({
  name: "dontaions",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createDonationForCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonationForCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createDonationForCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});

export default dontaionsSlice.reducer;