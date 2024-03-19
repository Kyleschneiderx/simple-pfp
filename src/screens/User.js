import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import React, {useState, useContext} from 'react'
// import {Context as AuthContext } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const SettingsItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
    {/* Ensure Icon is within TouchableOpacity and not causing the issue */}
    <Icon name="chevron-right" size={24} color="#000" /> 
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.section}>
      {children}
    </View>
  </View>
);


const User = ({route}) => {




  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <SettingsSection title="Exercises">
        <SettingsItem title="Targeted Exercises" onPress={() => navigation.navigate('ExercisePlan')} />
      </SettingsSection>

      <SettingsSection title="Account Settings">
        <SettingsItem title="Profile" onPress={() => navigation.navigate('Profile')} />
        <SettingsItem title="Subscriptions" onPress={() => navigation.navigate('Subscriptions')} />
        <SettingsItem title="Language" onPress={() => navigation.navigate('Language')} />
        <SettingsItem title="Chat with a PF Specialist" onPress={() => navigation.navigate('Chat')} />
        {/* <SettingsItem title="Password" onPress={() => navigation.navigate('Password')} /> */}
      </SettingsSection>

      <SettingsSection title="Goals">
        <SettingsItem title="Notifications" onPress={() => navigation.navigate('Notifications')} />
      </SettingsSection>

      <SettingsSection title="Other">
        <SettingsItem title="Share" onPress={() => navigation.navigate('Share')} />
        <SettingsItem title="Support" onPress={() => navigation.navigate('Support')} />
        <SettingsItem title="FAQ" onPress={() => navigation.navigate('FAQ')} />
        <SettingsItem title="Terms of Service" onPress={() => navigation.navigate('Terms')} />
      </SettingsSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5', // Light background color
  },
  sectionContainer: {
    marginVertical: 25,
    marginHorizontal: 20,
  },
  section: {
    backgroundColor: '#e3d8f1', // White background for the "bubble"
    borderRadius: 10, // Rounded corners
    padding: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,

    marginBottom: 10, // Space between title and bubble
  },
  item: {
    flexDirection: 'row', // Align title and arrow icon
    alignItems: 'center', // Center items vertically
    paddingVertical: 10,
    justifyContent: 'space-between', // Push title to the start and arrow icon to the end
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default User



    // const { state, signout } = useContext(AuthContext)


  // const Signout = ()=>{
  //   console.log("In signing out")
  //       // signout()
  //   }

  // return (
  //   <ScrollView>
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , padding:10}}>
  //       <TouchableOpacity onPress={() => Signout()}>
  //           <Text>SignOut</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </ScrollView>
  // )