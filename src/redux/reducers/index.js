import { combineReducers } from '@reduxjs/toolkit';
import workoutPlanReducer from '../features/workoutPlanSlice';
import subscriptionPlanReducer from '../features/subscriptionPlanSlice';

const rootReducer = combineReducers({
  // Add workout plan slice reducer here
  workoutPlan: workoutPlanReducer,
  subscriptionPlan: subscriptionPlanReducer,

});

export default rootReducer;