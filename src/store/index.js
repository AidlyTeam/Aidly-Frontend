// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import authSlice from './auth/authSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    user : userSlice,
    
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})