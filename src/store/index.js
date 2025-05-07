// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import authSlice from './auth/authSlice'
import userSlice from './user/userSlice'
import categorySlice from './category/categorySlice'
import campaignSlice from './campaign/campaignSlice'
import donationsSlice from './donations/donationsSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    user : userSlice,
    category : categorySlice,
    campaign : campaignSlice,
    donations : donationsSlice,
    
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})