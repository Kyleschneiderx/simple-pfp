import React, { useRef, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlan, setSelectDay, resetProgress } from '../../redux/features/workoutPlanSlice';
import { setPlanType, activatePlan, deactivatePlan } from '../../redux/features/subscriptionPlanSlice';
import PlanSelectionCard from '../../components/PlanSelectionCard';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native'

const plans = [
    {   
        id: 0,
        title: "Long Term Pelvic Health 🍑",
        description:"This is a short description of the plan.",
        type:"Free",
        titleDetail: "Daily Pelvic Health Workout Plan",
        overview: "This Daily Pelvic Health Workout Plan is meticulously designed to enhance pelvic floor and core strength, offering a balanced routine that supports pelvic health. Suitable for individuals looking to improve their pelvic stability, this plan incorporates exercises that target the pelvic floor muscles, core stability, and overall flexibility. With a focus on diaphragmatic breathing, pelvic floor engagement, and core strengthening exercises, the program is structured to provide a holistic approach to maintaining optimal pelvic health.",
        features: [
        "Pelvic Floor Muscle Focus: Tailored exercises to strengthen the pelvic floor, crucial for stability and health.",
        "Core Stability: Engages and strengthens the core, supporting pelvic health and improving posture.",
        "Flexibility and Mobility: Includes exercises aimed at enhancing flexibility and mobility in the pelvic region.",
        "Holistic Approach: Combines strength training, breathing techniques, and mobility work for comprehensive pelvic health."
        ],
        weeklyBreakdown: [
        "Daily Routine: A consistent daily practice focusing on pelvic floor strengthening, core engagement, and flexibility exercises to gradually build and maintain pelvic health.",
        "Adaptable Intensity: Exercises can be adjusted in intensity to match personal fitness levels and progress over time.",
        "Comprehensive Coverage: Targets all aspects of pelvic health, from muscle strength to breathing control, ensuring a well-rounded approach.",
        "Progressive Complexity: While the core exercises remain consistent, the plan encourages increasing repetitions or holding times as strength and endurance improve."
        ],
        disclaimer: "The Daily Pelvic Health Workout Plan is provided for informational purposes only and is not intended as medical advice, nor should it replace advice from healthcare professionals. Always consult with a healthcare provider before beginning any new exercise regimen, especially if you have concerns about your pelvic health or are recovering from pregnancy or surgery. If you experience any pain, discomfort, or other symptoms during the exercises, stop immediately and seek medical advice. Participation in this workout plan is at your own risk."     
    },
    {   
        id: 1,
        title: "Sexual Health 🍑",
        description:"Designed to enhance pelvic floor strength, boost core stability, and improve sexual wellness.",
        type:"Pro",
        titleDetail: "28-Day Sexual Health Workout Plan",
        overview: "Our 28-Day Sexual Health Workout Plan is meticulously designed to enhance your pelvic floor strength, improve blood flow, and boost core stability, contributing significantly to your overall sexual health and wellness. This comprehensive program is structured into four progressive weeks, each focusing on foundational techniques, building intensity, increasing complexity, and mastery & maintenance. By integrating exercises such as diaphragmatic breathing, pelvic floor muscle (PFM) exercises, core stabilization movements, and dynamic balance and coordination activities, this plan is your path to a healthier and more vibrant sexual life.",
        features: [
          "Tailored Approach: Exercises are carefully selected to cater to varying levels of fitness, ensuring gradual progression.",
          "Holistic Focus: Combines strength, flexibility, mobility, and endurance training for overall well-being.",
          "Easy to Follow: Clear day-by-day structure to guide you through each phase of the program.",
          "Adaptable Routines: Suitable for those with a busy lifestyle, providing options for shorter sessions without compromising effectiveness."
          // Add more features as needed
        ],
        weeklyBreakdown: [
          "Week 1: Foundation Building - Focus on learning the basics of diaphragmatic breathing and initiating core and pelvic floor muscle work.",
          "Week 2: Building Intensity - Introduce more challenging exercises to enhance core stability and pelvic floor strength.",
          "Week 3: Increasing Complexity - Incorporate complex movements to challenge the body further, promoting muscle endurance and flexibility.",
          "Week 4: Mastery & Maintenance - Consolidate the gains made in previous weeks, focusing on maintaining improvements in sexual health."
          // Add more weekly breakdowns as needed
        ],
        disclaimer: "This 28-Day Sexual Health Workout Plan is intended for educational and informational purposes only. It should not be considered as medical advice or a substitute for professional medical consultation, diagnosis, or treatment. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition. Do not start this fitness program if your physician or health care provider advises against it. If you experience faintness, dizziness, pain, or shortness of breath at any time while exercising, you should stop immediately. The use of any information provided in this plan is solely at your own risk.",
        
        
    },
    {   
        id: 2,
        title: "Urinary Incontinence 💦",
        description:"Learn the tools and the skill to stop the leaky bladder.",
        type:"Pro",
        "titleDetail": "28-Day Urinary Incontinence Workout Plan",
        "overview": "This comprehensive 28-day workout plan is specifically designed to strengthen the pelvic floor muscles, enhance core stability, and improve urinary incontinence symptoms. It offers a balanced and structured approach, gradually progressing in intensity from foundation building to advanced strengthening, integrating diaphragmatic breathing, pelvic floor muscle exercises, core stabilization movements, and functional activities. Aimed at promoting pelvic health, this plan is your guide to managing urinary incontinence through targeted physical activity.",
        "features": [
          "Daily Structured Exercises: Provides clear day-by-day exercises for focused and gradual improvement.",
          "Progressive Intensity: Carefully designed to increase intensity and complexity, ensuring continuous advancement in pelvic floor strength and core stability.",
          "Holistic Approach: Includes a variety of exercises for breathing, core stabilization, pelvic floor strengthening, and functional movements to address urinary incontinence from multiple angles.",
          "Flexibility and Adaptability: Offers the ability to adjust exercises based on individual capabilities, response, and comfort, ensuring a personalized workout experience."
        ],
        "weeklyBreakdown": [
          "Week 1: Foundation Building - Basic pelvic floor muscle awareness, diaphragmatic breathing, and core stabilization.",
          "Week 2: Core and Pelvic Floor Strengthening - Enhanced pelvic floor muscle control, increased core exercise complexity, and the introduction of functional movements.",
          "Week 3: Intermediate Core and Pelvic Stability - Advanced pelvic floor exercises, dynamic core exercises, and further integration of functional movements.",
          "Week 4: Cool Down and Maintenance - Focus on flexibility, maintenance exercises for pelvic health, and relaxation techniques."
        ],
        "disclaimer": "This 28-Day Urinary Incontinence Workout Plan is provided for informational purposes only and is not intended as medical advice, diagnosis, or treatment. Participation in any exercise program carries an inherent risk of physical injury. It is recommended to consult with a healthcare professional before starting any new exercise program, especially for individuals with specific health conditions, including but not limited to urinary incontinence. The user assumes all risks of injury arising from the performance of any exercise detailed in this plan. The creators, authors, and publishers of this plan disclaim any liabilities or loss in connection with the exercises and advice herein."
    },
    {
        id: 3,
        title: "Pre-natal 🤰",
        description:"Get ready fro pregnancy and birth.",
        type:"Pro",
        "titleDetail": "28-Day Prenatal Workout Plan",
        "overview": "Embark on a journey towards physical and mental well-being with our 28-day prenatal workout plan, designed to support expectant mothers through a blend of pelvic floor exercises, gentle strength training, and calming stretches. Promoting overall health, flexibility, and stability, each week of the program focuses on enhancing your body's endurance, mobility, and balance, ensuring a holistic approach to prenatal fitness. Carefully crafted to adapt to your unique journey, this plan offers a thoughtful mix of activities aimed at providing comprehensive support without overexertion.",
        "features": [
          "Holistic Approach: Covers all bases of prenatal fitness, from diaphragmatic breathing to gentle stretching and strength training.",
          "Progressive Design: Structured to gradually enhance your fitness level safely throughout your pregnancy.",
          "Flexible and Adaptable: Allows for adjustments based on personal comfort and energy levels, ensuring a personalized experience.",
          "Diverse Exercises: A wide range of exercises to keep the routine engaging, addressing different muscle groups and prenatal health aspects."
        ],
        "weeklyBreakdown": [
          "Week 1: Foundation and Stability - Focus on foundational exercises like diaphragmatic breathing and simple pelvic floor exercises to build stability.",
          "Week 2: Building Strength and Flexibility - Introduce strength-building exercises and stretches to enhance flexibility, focusing on pelvic and core stability.",
          "Week 3: Enhancing Mobility and Endurance - Increase the complexity of movements to enhance mobility and endurance, incorporating more dynamic exercises.",
          "Week 4: Coordination, Balance, and Relaxation - Concentrate on exercises that improve coordination and balance, while incorporating relaxation techniques to prepare for childbirth."
        ],
        "disclaimer": "This prenatal workout plan is designed for informational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or exercise regimen. If you experience any pain or discomfort during any exercise, stop immediately and consult your healthcare provider. The safety and well-being of you and your baby are of utmost importance. Participation in this workout plan is at your own risk."
    },
    {
        id: 4,
        title: "Postpartum 👶",
        description:"Regain your strength after pregnancy.",
        type:"Pro",
        "titleDetail": "28-Day Postpartum Workout Plan",
        "overview": "Our 28-Day Postpartum Workout Plan is expertly crafted to support new mothers in their journey to regain core and pelvic floor strength, enhance overall physical wellness, and navigate the postpartum period with confidence. Spanning over four weeks, the program begins with foundational exercises to gently reintroduce physical activity, gradually progressing to more challenging workouts that focus on building strength, stability, and endurance. This plan includes a variety of exercises such as diaphragmatic breathing, pelvic floor muscle (PFM) work, and targeted movements for core stabilization, ensuring a comprehensive approach to postpartum fitness.",
        "features": [
          "Gentle Reintroduction: Designed specifically for postpartum recovery, focusing on safety and gradual progression.",
          "Core and Pelvic Floor Emphasis: Aims to rebuild strength in critical areas affected by pregnancy and childbirth.",
          "Structured Yet Flexible: Clear, day-by-day workout plan that accommodates the unpredictable nature of new motherhood.",
          "Comprehensive Approach: Incorporates breathing techniques, strength training, mobility exercises, and balance work for holistic recovery."
        ],
        "weeklyBreakdown": [
          "Week 1: Foundation and Gentle Activation - Introduces gentle core engagement and pelvic floor exercises to start rebuilding strength safely.",
          "Week 2: Core and Pelvic Floor Strengthening - Builds on the foundation with exercises aimed at enhancing core stability and pelvic floor strength.",
          "Week 3: Stability and Mobility - Focuses on improving body stability and mobility through more dynamic exercises.",
          "Week 4: Integration and Strength Building - Advances to more challenging workouts to further strengthen the body and consolidate gains."
        ],
        "disclaimer": "The 28-Day Postpartum Workout Plan is provided for informational purposes only and is not intended as medical advice, nor should it replace advice from healthcare professionals. Always consult your healthcare provider before beginning any new exercise program, especially postpartum, to ensure it is appropriate for your specific health conditions and recovery status. If you experience any pain, discomfort, or other symptoms while exercising, stop immediately and seek medical advice. The use of this workout plan is at your own risk."
    }
    // Add more plans as needed
];

const SubscriptionOptions = ({ onSubscribeMonthly, onSubscribeYearly }) => {
    return (
      <BottomSheetView style={styles.container}>
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
      </BottomSheetView>
    );
};




const WorkoutPlanSelector = () => {
    const dispatch = useDispatch();
    const selectedPlan = useSelector((state) => state.workoutPlan.selectedPlan);
    const isSubscribed = useSelector((state) => state.subscriptionPlan.status)
    const bottomSheetRef = useRef(null); // Ref for the bottom sheet
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const navigation = useNavigation()
  
    // const handleSelectPlan = (planId) => {
    //     dispatch(resetProgress())
    //   dispatch(setSelectedPlan(planId));
    //   dispatch(setSelectDay(1))
    // };

    const goToWorkoutDetailPage = (details) => {
        navigation.navigate('Details', {
            details: details,
        })

    }

    

    // const handleSelectPlan = useCallback((plan) => {
    //     const planDetail = plans.find(p => p.id === plan);
    //     if (planDetail.type === "Pro" && isSubscribed === "inactive") {
    //         console.log(isSubscribed)
    //         // Open the bottom sheet for Pro plans
    //         bottomSheetRef.current?.expand();
    //     } else {
    //         // Proceed with setting the plan for Free plans
    //         dispatch(resetProgress());
    //         dispatch(setSelectedPlan(plan));
    //         dispatch(setSelectDay(1));
    //     }
    // }, [isSubscribed]);

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

    console.log(plans[selectedPlan])
    const freePlans = plans.filter(plan => plan.type === "Free");
    const premiumPlans = plans.filter(plan => plan.type === "Pro");


    const chooseSubscription = (plan) => {
        dispatch(setPlanType(plan))
        dispatch(activatePlan())
    }


    const deactivate = () =>{
        dispatch(deactivatePlan())
    }

    console.log(isSubscribed)
    
  
    return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginVertical: 10 }}>Free Pelvic Health Plan</Text>
        {freePlans.map((plan) => (
          <PlanSelectionCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            onPress={() => goToWorkoutDetailPage(plan)}
            selected={selectedPlan === plan.id} // Pass selected prop
          />
        ))}
        <Text style={{ fontSize: 20, marginVertical: 10 }}>PF Expert Designed (PRO)</Text>
        {premiumPlans.map((plan) => (
          <PlanSelectionCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            onPress={() => goToWorkoutDetailPage(plan)}
            selected={selectedPlan === plan.id} // Pass selected prop
          />
        ))}
        <TouchableOpacity onPress={()=> deactivate()}><Text>deactivate</Text></TouchableOpacity>
      </ScrollView>
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
});



  
export default WorkoutPlanSelector;



      {/* <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}>
          <BottomSheetView>
            <Text>This is a premium plan. Please subscribe to access.</Text>
            <Button title="Subscribe Now" onPress={() => console.log('Subscription logic goes here')} />
          </BottomSheetView>
        </BottomSheet> */}