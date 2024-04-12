import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  year: new Date().getFullYear(),
  month: 0,
  day: 0,
}

const dateSlice = createSlice({
  name: 'dateSlice',
  initialState,
  reducers: {
    setYear: (state, { payload }) => {
      state.year = payload
    },
    setMonth: (state, { payload }) => {
      state.month = payload
    },
    setDay: (state, { payload }) => {
      state.day = payload
    },
  },
})

export const { setDay, setMonth, setYear } = dateSlice.actions

export default dateSlice.reducer
