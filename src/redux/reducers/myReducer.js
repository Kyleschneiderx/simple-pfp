import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
  name: 'myFeature',
  initialState: {
    data: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = mySlice.actions;

export default mySlice.reducer;