import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/user/profile`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      console.log(response);
     
      if (response.status === 200) {
        dispatch(getUserInfo());
        return response.data;
      }
    } catch (response) {
      return rejectWithValue(error.response?.data?.message|| error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/user/profile`,
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

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        showToast("dismiss")
        showToast("success", "Profile updated successfully");
      })
      .addCase(updateProfile.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
        showToast("dismiss")
        showToast("error", action.payload);
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});

export default userSlice.reducer;