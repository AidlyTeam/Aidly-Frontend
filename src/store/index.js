// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import authSlice from './auth/authSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
   
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})