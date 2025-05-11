import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserInfo } from "../user/userSlice";


const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const getNFtsMinted = createAsyncThunk(
  "nft/getNFtsMinted",
  async (data, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/badge/mint/${data.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
     
      if (response.status === 200) {
        dispatch(getUserInfo())
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(error.response?.data?.message|| error.message);
    }
  }
);


const nftsSlice = createSlice({
  name: "nfts",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNFtsMinted.pending, (state) => {
        state.loading = true;
        showToast("dismiss")
        showToast("loading", "Minting NFTs Please Wait...");
      })
      .addCase(getNFtsMinted.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        showToast("dismiss")
        showToast("success", "NFTs minted successfully");
      })
      .addCase(getNFtsMinted.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
        showToast("dismiss")
        showToast("error", "Please try again in 5 minutes");
      })
      
  },
});

export default nftsSlice.reducer;