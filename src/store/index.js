// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import authSlice from './auth/authSlice'
import userSlice from './user/userSlice'
import categorySlice from './category/categorySlice'
import campaignSlice from './campaign/campaignSlice'
export const store = configureStore({
  reducer: {
    auth : authSlice,
    user : userSlice,
    category : categorySlice,
    campaign : campaignSlice,
    
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})