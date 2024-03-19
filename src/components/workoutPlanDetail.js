import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const WorkoutPlanDetails = ({ details, style }) => {

  console.log(details, "In component")

  return (
    <ScrollView style={[styles.container, style]}>
      <View style={styles.section}>
        <Text style={styles.header}>{details.titleDetail}</Text>

        <Text style={styles.subheader}>Overview:</Text>
        <Text style={styles.text}>{details.overview}</Text>
        
        <Text style={styles.subheader}>Features:</Text>
        <Text style={styles.text}>{details.features.map((feature, index) => (
          <Text key={index} style={styles.text}>- {feature}{"\n"}</Text>
        ))}</Text>
        
        <Text style={styles.subheader}>Weekly Breakdown:</Text>
        <Text style={styles.text}>{details.weeklyBreakdown.map((week, index) => (
          <Text key={index} style={styles.text}>- {week}{"\n"}</Text>
        ))}</Text>
        
        <Text style={styles.subheader}>Disclaimer:</Text>
        <Text style={styles.text}>{details.disclaimer}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 24,
  },
});

export default WorkoutPlanDetails;