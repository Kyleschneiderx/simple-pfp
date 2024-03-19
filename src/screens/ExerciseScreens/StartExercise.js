import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleExerciseCompletion, toggleDayCompletion } from '../../redux/features/workoutPlanSlice';
import {Video} from 'expo-av';
import Data from '../../assets/workoutData.json';

const StartExercise = ({ route, navigation }) => {

const { workoutId, dayId } = route.params;
  const dispatch = useDispatch();
  // Simulate fetching workout data from Redux store or a local JSON file
//   const workoutData = useSelector((state) => state.workoutPlan); // Adjust based on your actual state
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const workoutData = Data

  const progress = useSelector((state) => state.workoutPlan.progress)

  useEffect(() => {

    console.log(workoutId, dayId )
    
  // Convert to number if necessary
    
  
    const workout = workoutData.workouts.find((w) => w.workoutID === workoutId);
    console.log(workout, "Workout")
    const day = workout?.workoutPlan.find((d) => parseInt(d.Day-1, 10) === parseInt(dayId-1 , 10));
    console.log(day, 'Outside');
    setCurrentExercise(day?.Exercises[0]);
  }, [workoutId, dayId, workoutData]);

  const handleCompleteExercise = () => {
    if (currentExercise) {
      dispatch(toggleExerciseCompletion({ 
        dayId: dayId, 
        exerciseId: currentExercise.ExerciseId, 
        completed: true 
      }));
      // Move to the next exercise
      const nextIndex = exerciseIndex + 1;
      const nextExercise = workoutData.workouts.find((w) => w.workoutID === workoutId)
                            ?.workoutPlan.find((d) => parseInt(d.Day-1, 10) === parseInt(dayId-1 , 10))?.Exercises[nextIndex];
      if (nextExercise) {
        setCurrentExercise(nextExercise);
        setExerciseIndex(nextIndex);
      } else {
        // No more exercises for the day
        dispatch(toggleDayCompletion({ 
            dayId: dayId,  
            completed: true 
        }));
        setCurrentExercise(null);
        console.log('All exercises for the day completed!');
      }
    }
  };

  const handlePreviousExercise = () => {
    if (exerciseIndex > 0) {
      // There's a previous exercise
      const prevIndex = exerciseIndex - 1;
      const prevExercise = workoutData.workouts.find((w) => w.workoutID === workoutId)
                            ?.workoutPlan.find((d) => parseInt(d.Day-1, 10) === parseInt(dayId-1 , 10))?.Exercises[prevIndex];
      if (prevExercise) {
        setCurrentExercise(prevExercise);
        setExerciseIndex(prevIndex);
      }
    } else {
      // This is the first exercise, so navigate back or handle as needed
      console.log('This is the first exercise of the day.');
      // Optionally navigate back to home or previous screen
      navigation.goBack();
    }
  };

  const headHome = () =>{
    navigation.navigate('Home')
  }
  console.log(progress)
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      {currentExercise ? (
        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseTitle}>{currentExercise.Name}</Text>
          <Video
            source={{uri: currentExercise.Video}} // The video file URL
            style={styles.video}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping// Show player controls
            useNativeControls
            
            />
          <Text style={styles.exerciseTitle}>Sets: {currentExercise.Sets}</Text>
          <Text style={styles.exerciseTitle}>Reps: {currentExercise.Reps}</Text>
          {currentExercise.Hold && <Text style={styles.exerciseTitle}>Hold: {currentExercise.Hold}</Text>}
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteExercise}>
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
          {exerciseIndex > 0 && ( // Only show if there are previous exercises
            <TouchableOpacity style={styles.previousButton} onPress={handlePreviousExercise}>
                <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
            )}

        </View>
      ) : (
        <View>
        <Text>No more exercises for today!</Text>
        <TouchableOpacity style={styles.completeButton} onPress={headHome}>
        <Text style={styles.completeButtonText}>Mark day {dayId} as Complete</Text>
      </TouchableOpacity>
      </View>
      )}
    </ScrollView>
  );
};


const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  exerciseCard: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxHeight: screenHeight - (20 * 2), // Example: screen height minus some margin. Adjust according to your layout.
    // overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#ffffff',
  },
  video: {
    width: '100%', // Use 100% of the card's width
    height: 300, // Set a fixed height, adjust as needed
    borderRadius: 8, // Optional: round the corners to match the card style
    marginTop: 10, // Add some space above the video
  },
});

export default StartExercise;
