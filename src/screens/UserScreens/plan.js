import React, {useCallback, useRef, useMemo} from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import WorkoutPlanDetails from '../../components/workoutPlanDetail';
import { setSelectedPlan, setSelectDay, resetProgress } from '../../redux/features/workoutPlanSlice';
import { setPlanType, activatePlan, deactivatePlan } from '../../redux/features/subscriptionPlanSlice';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native'



const SubscriptionOptions = ({ onSubscribeMonthly, onSubscribeYearly }) => {
    const isSubscribed = useSelector((state) => state.subscriptionPlan.status)




    return (
    <BottomSheetView style={styles.Popcontainer}>
        {isSubscribed === 'active' ? <Text>Your subscription is Active</Text> :
        <>
        <Text style={styles.title}>Premium Plan Access</Text>
        <Text style={styles.description}>
          Subscribe to access our premium plans and accelerate your progress.
        </Text>
  
        <TouchableOpacity style={[styles.button, styles.monthlyButton]} onPress={onSubscribeMonthly}>
          <Text style={styles.buttonText}>Subscribe Monthly - $2.99</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.yearlyButton]} onPress={onSubscribeYearly}>
          <Text style={styles.buttonText}>Subscribe Yearly - $19.99</Text>
        </TouchableOpacity>
        </>
        }
      </BottomSheetView>

    );
};



const Plan = ({route}) => {

    const dispatch = useDispatch();
    const selectedPlan = useSelector((state) => state.workoutPlan.selectedPlan);
    const isSubscribed = useSelector((state) => state.subscriptionPlan.status)
    const bottomSheetRef = useRef(null); // Ref for the bottom sheet
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const navigation = useNavigation()

    const {details} = route.params


    const handleSelectPlan = useCallback((plan) => {
        // const planDetail = plans.find(p => p.id === plan);
        console.log(plan)
        if (plan.type === "Pro" && isSubscribed === "inactive") {
            console.log(isSubscribed)
            // Open the bottom sheet for Pro plans
            bottomSheetRef.current?.expand();
        } else {
            // Proceed with setting the plan for Free plans
            dispatch(resetProgress());
            dispatch(setSelectedPlan(plan.id));
            dispatch(setSelectDay(1));
            navigation.navigate('ExercisePlan')
        }
    }, [isSubscribed]);

    const renderBackdrop = useCallback(
        (props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Make the backdrop disappear when the sheet is fully closed.
            appearsOnIndex={0} // Make the backdrop appear when the sheet opens.
            onPress={() => bottomSheetRef.current?.close()} // Close the sheet when the backdrop is pressed.
          />
        ),
        [isSubscribed]
    );

    const chooseSubscription = (sub) => {
        console.log(sub)
        dispatch(setPlanType(sub))
        dispatch(activatePlan())
    }


    const deactivate = () =>{
        dispatch(deactivatePlan())
    }

    console.log(isSubscribed)


    return (

        <View style={styles.container}>
        <WorkoutPlanDetails details={details} />
        <TouchableOpacity 
        onPress={() => handleSelectPlan(details)}
        style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Select Plan</Text>
      </TouchableOpacity>
      <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}>
          <BottomSheetView>
            {/* <Text>This is a premium plan. Please subscribe to access.</Text>
            <Button title="Subscribe Now" onPress={() => console.log('Subscription logic goes here')} /> */}
            <SubscriptionOptions
            onSubscribeMonthly={() => chooseSubscription('monthly')}
            onSubscribeYearly={() => chooseSubscription('yearly')}
            />
                        {/* <Text>This is a premium plan. Please subscribe to access.</Text> */}
          </BottomSheetView>
        </BottomSheet>
      </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      position: 'relative',
      paddingBottom: 100 // Add some padding around the main container
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
      Popcontainer: {
        padding: 20,
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
      },
      monthlyButton: {
        backgroundColor: '#007bff',
      },
      yearlyButton: {
        backgroundColor: '#28a745',
      },
      buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      },

})
  
export default Plan;