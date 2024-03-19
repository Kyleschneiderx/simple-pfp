import { createSlice } from '@reduxjs/toolkit';

export const workoutPlanSlice = createSlice({
  name: 'workoutPlan',
  initialState: {
    selectedPlan: 1,
    selectedDay: 1,// The selected plan ID
    progress: {},
  },
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    // Action to mark a day as completed or not
    setSelectDay: (state, action) =>{
        state.selectedDay = action.payload
    },
    toggleDayCompletion: (state, action) => {
      const { dayId, completed } = action.payload;
      if (!state.progress[dayId]) {
        state.progress[dayId] = { completed: false, exercises: {} };
      }
      state.progress[dayId].completed = completed;
    },
    // Action to toggle an exercise's completion status
    toggleExerciseCompletion: (state, action) => {
        const { dayId, exerciseId, completed } = action.payload;
        // Ensure the day object exists
        if (!state.progress[dayId]) {
          state.progress[dayId] = { exercises: {} };
        }
        // Update the specific exercise completion status
        state.progress[dayId].exercises[exerciseId] = completed;
      },
      resetProgress: (state) => {
        state.progress = {}; // Reset only progress to its initial state
      },
  },
});

export const { setSelectedPlan, toggleDayCompletion, toggleExerciseCompletion, setSelectDay, resetProgress } = workoutPlanSlice.actions;

export default workoutPlanSlice.reducer;