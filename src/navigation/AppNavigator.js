import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator'; // Import MainTabNavigator
import WorkoutPlanSelector from '../screens/UserScreens/workoutPlanSelection';
import Plan from '../screens/UserScreens/plan';
import ExerciseProgram from '../screens/ExerciseScreens/ExerciseProgram';
import StartExercise from '../screens/ExerciseScreens/StartExercise';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    <Stack.Screen
        name="ExercisePlan"
        component={WorkoutPlanSelector}
        options={{ headerShown: true }}
    />
    <Stack.Screen
        name="Details"
        component={Plan}
        options={{ headerShown: true }}
    />
    <Stack.Screen
        name="Program"
        component={ExerciseProgram}
        options={{ headerShown: true }}
    />
        <Stack.Screen
        name="Workout"
        component={StartExercise}
        options={{ headerShown: true }}
    />


      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
}

export default AppNavigator;