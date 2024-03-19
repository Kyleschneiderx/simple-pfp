import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Exercise from '../screens/Excercise'; // Ensure correct spelling
import User from '../screens/User';
import Header from '../components/Header'; // If you need to use Header here
import { SafeAreaView, Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MainTabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 18 },
          tabBarStyle: { backgroundColor: 'transparent' },
          elevation: 0,
          tabBarIndicatorStyle: {
            backgroundColor: '#e3d8f1',
          },
        }}
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
      >
        <Tab.Screen name="Dashboard" component={Exercise} />
        {/* <Tab.Screen name="Visits" component={Visits} /> Commented out but left for future use */}
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default MainTabNavigator;