import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planType: 'monthly', // Default to 'monthly'
  status: 'inactive',
  startDate: null,
  cancelDate: null // Default to 'inactive'
  // Add more fields as needed, such as price, startDate, etc.
};

export const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlan',
  initialState,
  reducers: {
    setPlanType: (state, action) => {
      state.planType = action.payload;
    },
    activatePlan: (state) => {
      state.status = 'active';
      // Implement activation logic, possibly updating other state pieces
    },
    deactivatePlan: (state) => {
      state.status = 'inactive';
      // Implement deactivation logic, possibly updating other state pieces
    },
    // Add more reducers for other actions as needed
  },
});

// Action creators are generated for each reducer function
export const { setPlanType, activatePlan, deactivatePlan } = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;