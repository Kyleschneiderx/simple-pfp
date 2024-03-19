import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import WorkoutCard from '../../components/WorkoutCard';
import Data from '../../assets/workoutData.json';
import { Picker } from '@react-native-picker/picker';
import DropdownPicker from 'react-native-dropdown-picker'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleExerciseCompletion, setSelectDay } from '../../redux/features/workoutPlanSlice';
import {useNavigation} from '@react-navigation/native'

const ExerciseProgram = ({ route }) => {
    
    
    
    const navigation = useNavigation();
    const [open, setOpen] = useState(false)

    const scrollViewRef = useRef(null);


    const dispatch = useDispatch();
    const progress = useSelector((state) => state.workoutPlan.progress);
    const [day, setDay] = useState(null);
    const [items, setItems] = useState([]); // Assuming this will be dynamically populated
    const { workoutId } = route.params;
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        // Dynamically populate `items` based on your workout data
        const workoutDays = Data.workouts.find(workout => workout.workoutID === parseInt(workoutId, 10))?.workoutPlan.map((_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }));
        setItems(workoutDays || []);

        // Automatically find the next uncompleted day if `day` is not manually set
        if (!day) {
            const nextDay = workoutDays?.find(({ value }) => !progress[value]?.completed)?.value;
            if (nextDay) {
                setDay(nextDay);
                dispatch(setSelectDay(nextDay));
            }
        }

        // Fetch workout details based on the current `day`
        
        const workoutDetails = Data.workouts.find((workout) => workout.workoutID === parseInt(workoutId, 10))?.workoutPlan[parseInt(day, 10)-1];
        setSelectedWorkout(workoutDetails);
    }, [workoutId, day, progress]);




    // useEffect(() => {
    //     // Update the selectedWorkout based on the current workoutId and workoutDay
    //     setDay(workoutDay)
    //     console.log(workoutId, "Useeffect")
    //     console.log(workoutDay, "Useeffect")
    //     const workoutDetails = Data.workouts.find((workout) => workout.workoutID === parseInt(workoutId, 10))?.workoutPlan.find((_, index) => index + 1 === parseInt(workoutDay, 10));
    //     console.log(workoutDetails, "Workout Detail")
    //     setSelectedWorkout(workoutDetails);
    // }, [workoutDay, workoutId]);

    // useEffect(() => {
    //     const workoutDetails = Data.workouts.find((workout) => workout.workoutID === parseInt(workoutId, 10))?.workoutPlan;
    //     const firstIncompleteDay = workoutDetails?.find(day => !progressDay[day.Day]?.completed);
    
    //     if (firstIncompleteDay) {
    //         setDay(firstIncompleteDay.Day); // Assuming setDay updates the state that determines which day is being shown
    //         setSelectedWorkout(firstIncompleteDay);
    //     } else {
    //         console.log("All days completed or no workout details found.");
    //     }
    // }, [workoutId, progressDay]);

    

    console.log(workoutId, "Testing") // Assuming you're passing the workoutId in the route params
//   const selectedWorkout = Data.workouts.find(workout => workout.workoutID.toString() === workoutId);
    // const selectedWorkout = Data.workouts[workoutId-1].workoutPlan[workoutDay-1];
    // console.log(selectedWorkout)
    console.log(progress)

    const handleSetDay = (day) =>{

        console.log(day, "handleSetDay")
        dispatch(setSelectDay(day))
    }

    // const handleCompleteExercise = (dayIndex, exerciseId) => {
    //     console.log(dayIndex, exerciseId, 'Inside handleCompleteExercises')
    //     dispatch(toggleExerciseCompletion({ dayId: dayIndex.toString(), exerciseId: exerciseId.toString(), completed: true }));
    // };

    const goDetail =(id, day)=>{
        console.log(id, day)
        navigation.navigate('Workout', {
            workoutId: id,
            dayId: day
        })
    }
console.log(selectedWorkout)
  return (
    <View style={styles.container}>
        <DropdownPicker
        open={open}
        value={day} // Ensure the selectedDay from Redux state is a string
        items={items}
        setOpen={setOpen}
        setValue={setDay} // Pass the new value to handleSetDay
        setItems={setItems}
        onChangeValue={(val) =>{handleSetDay(val)}}
        style={styles.dropdownPicker}
        dropDownContainerStyle={styles.dropdownContainer}
        />

    <ScrollView ref={scrollViewRef} contentContainerStyle={{ alignItems: 'center' }}>

      {selectedWorkout && selectedWorkout.Exercises.map((exercise, exerciseIndex) => (
        <React.Fragment key={exerciseIndex}>
            <View key={exerciseIndex} style={styles.card}>
                <Text style={styles.exerciseTitle}>{exercise.Name}</Text>
                <Text style={styles.exerciseDetail}>Sets: {exercise.Sets}</Text>
                <Text style={styles.exerciseDetail}>Reps: {exercise.Reps}</Text>
                {day.Hold && <Text style={styles.exerciseDetail}>Hold: {exercise.Hold}</Text>}
                <Text style={styles.exerciseDescription}>{exercise.Description}</Text>
                <Text>{progress[day.Day]?.exercises[exercise.exerciseId]}</Text>
                {/* {progress.exercises.index(dayIndex)  && <Text style={styles.exerciseDetail}>Hold: {day.Hold}</Text>} */}
                {progress[day]?.exercises[exercise.ExerciseId.toString()] ? (
        <Text style={styles.completedText}>Completed</Text>
      ) : null}
            </View>
        </React.Fragment>
      ))}
    </ScrollView>
    <TouchableOpacity 
      onPress={() => goDetail(workoutId, day)}
      style={styles.floatingButton}>
      <Text style={styles.floatingButtonText}>Start Workout</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      position: 'relative', // Add some padding around the main container
    },
    dropdownPicker: {
      width: '80%', // Make the picker take up more width
      alignSelf: 'center', // Center the picker
      marginBottom: 15, // Space between picker and content below
    },
    dropdownContainer: {
      width: '80%',
      alignSelf: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      exerciseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      exerciseDetail: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
      },
      exerciseDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 12,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        paddingTop: 12,
      },
      contentContainer: {
        marginBottom: 20, // Adjust spacing as needed
      },
      floatingButton: {
        position: 'absolute',
        bottom: 30, // Adjust this value as needed to increase space from the bottom
        backgroundColor: '#e3d8f1',
        borderRadius: 30,
        paddingVertical: 15, // Adjust vertical padding
        paddingHorizontal: 20, // Adjust horizontal padding for button content
        alignSelf: 'center', // This should correctly center the button
        width: '90%', // Adjust width as desired
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        alignItems: "center"
      },
      floatingButtonText: {
        color: 'black', // Text color
        fontSize: 16,// Text size
        // Add more text styling if needed
      },
      completedText: {
        marginTop: 10,
        color: 'green', // Example color for completed text
        fontWeight: 'bold',
        // Add other styling as needed
      },
    // Add more styling as needed...
  });

export default ExerciseProgram;

          {/* {day.Exercises.filter(exercise => !(progress[dayIndex]?.exercises?.[exercise.ExerciseId.toString()])).map((exercise) => (
            <WorkoutCard 
              key={exercise.ExerciseId}
              title={exercise.Name}
              video={exercise.Video}
              description={exercise.Description}
              sets={exercise.Sets}
              reps={exercise.Reps}
              hold={exercise.Hold}
              onCompleteCard={() => handleCompleteExercise(day.Day, exercise.ExerciseId)}
            />
          ))} */}