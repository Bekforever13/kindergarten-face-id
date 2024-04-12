import { configureStore } from '@reduxjs/toolkit'
import dateSliceReducer from './slices/dateSlice'
import reportSliceReducer from './slices/reportSlice'

export const store = configureStore({
  reducer: {
    date: dateSliceReducer,
    report: reportSliceReducer,
  },
})
