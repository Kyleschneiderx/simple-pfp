import * as React from 'react';
import { SafeAreaView, Text, View, Dimensions, ScrollView } from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import ExcerciseCard from '../components/ExcerciseCard';
import {useNavigation} from '@react-navigation/native'
import { useSelector } from 'react-redux';



const data =[
    {   
        id: 0,
        title: "Daily Pelvic Health 🍑",
        description:"This is a short description of the plan.",
        type:"Free"

        
    },
    {   
        id: 1,
        title: "Sexual Health 🍑",
        description:"This is a short description of the plan.",
        type:"Pro"
        
    },
    {   
        id: 2,
        title: "Urinary Incontinence 💦",
        description:"This is a short description of the plan.",
        type:"Pro"
    },
    {
        id: 3,
        title: "Pre-natal 🤰",
        description:"This is a short description of the plan.",
        type:"Pro"
    },
    {
        id: 4,
        title: "Postpartum 👶",
        description:"This is a short description of the plan.",
        type:"Pro"
    }
]


function Exercise({navigation}) {
    // const navigation = useNavigation()
    const selectedPlan = useSelector((state) => state.workoutPlan.selectedPlan);
    const workoutDay = useSelector((state) => state.workoutPlan.selectedDay)
    console.log(workoutDay, "Workout Day")

    const goDetail =(id)=>{
        navigation.navigate('Program', {
            workoutId: id
        })
    }

    console.log(selectedPlan)
    return (
    <ScrollView>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' , paddingTop: 10, paddingLeft:20}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', }} >Your Exercise Plan</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , paddingBottom:20}}>
            <ExcerciseCard key={selectedPlan} title={data[selectedPlan].title} onPress={()=>goDetail(data[selectedPlan].id)}/>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' , paddingTop: 10, paddingLeft:20}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}} >Daily Pelvic Floor Education</Text>
        </View>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , padding:10}}>
        {data.map((item,index) =>{
            return(
                <ExcerciseCard key={index} title={item.title} onPress={()=>goDetail(item.id)}/>
            )
        })}
      </View> */}
    </ScrollView>
    );
}

export default Exercise;