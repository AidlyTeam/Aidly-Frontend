import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export const createNFT = createAsyncThunk(
  "admin/createNFT",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('imageFile', data.imageFile);
      formData.append('isNft', data.isNft);
      
      if (data.isNft) {
        formData.append('sellerFee', data.sellerFee);
        formData.append('symbol', data.symbol);
        formData.append('donationThreshold', data.donationThreshold);
      }
      

      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getNFTs = createAsyncThunk(
  "admin/getNFTs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/badge?isNft=true`,
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

export const getNFTById = createAsyncThunk(
  "admin/getNFTById",
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

export const updateNFT = createAsyncThunk(
  "admin/updateNFT",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('isNft', data.isNft);
      
      if (data.imageFile) {
        formData.append('imageFile', data.imageFile);
      }
      
      if (data.isNft) {
        formData.append('sellerFee', data.sellerFee);
        formData.append('symbol', data.symbol);
      } else {
        formData.append('donationThreshold', data.donationThreshold);
      }

      const response = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/nft/${id}`,
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

export const deleteNFT = createAsyncThunk(
  "admin/deleteNFT",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/nft/${id}`,
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

const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNFT.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createNFT.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        showToast("dismiss")
        showToast("success", "NFT created successfully");
      })
      .addCase(createNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast("dismiss")
        showToast("error", action.payload);
      })
      .addCase(getNFTs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getNFTs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getNFTs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(getNFTById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getNFTById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getNFTById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
      })
      .addCase(updateNFT.pending, (state) => {
        state.loading = true;
        state.error = false;
        showToast("dismiss")
      })
      .addCase(updateNFT.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        showToast("dismiss")
        showToast("success", "NFT updated successfully");
      })
      .addCase(updateNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
        showToast("dismiss")
        showToast("error", action.payload);
      })
      .addCase(deleteNFT.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteNFT.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        showToast("dismiss")
        showToast("success", "NFT deleted successfully");
      })
      .addCase(deleteNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || true;
        showToast("dismiss")
        showToast("error", action.payload);
      });
  },
});

export default nftSlice.reducer; 