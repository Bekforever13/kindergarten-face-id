import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reportData: [],
}

const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  reducers: {
    setReportData: (state, { payload }) => {
      state.data = payload
    },
  },
})

export const { setReportData } = reportSlice.actions

export default reportSlice.reducer
