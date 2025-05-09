import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/router";

const initialState = {
  loading: false,
  error: false,
  data: [],
};



export const getCampaignsForAdmin = createAsyncThunk(
  "admin/getCampaignsForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign`,
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



export const getCampaignByIdAdmin = createAsyncThunk(
  "admin/getCampaignByIdAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${data.id}`,
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


export const deleteCampaign = createAsyncThunk(
  "admin/deleteCampaign",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/campaign/${id}`,
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

export const changeVerificationStatus = createAsyncThunk(
    "admin/changeVerificationStatus",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/campaign/${data.campaignID}/verify`,
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

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCampaignsForAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCampaignsForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getCampaignsForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
     
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        showToast("dismiss")
        showToast("success", "Campaign deleted successfully");
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
        showToast("dismiss")
        showToast("error", action.payload);
      })
      .addCase(changeVerificationStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(changeVerificationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        showToast("dismiss")
        showToast("success", "Campaign verification status changed successfully");
      })
      .addCase(changeVerificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
        showToast("dismiss")
        showToast("error", action.payload);
      })
      .addCase(getCampaignByIdAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCampaignByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = false;
      })
      .addCase(getCampaignByIdAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload 
      });
  },
});

export default campaignSlice.reducer;