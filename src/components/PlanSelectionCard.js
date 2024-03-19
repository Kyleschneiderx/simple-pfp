import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const PlanSelectionCard = ({ title, onPress, selected, description }) => {
    return (
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            selected ? styles.cardSelected : null,
          ]}
          onPress={onPress}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {selected && <Icon name="check" size={24} color="green" style={styles.checkmark} />}
          </View>
        </Pressable>
      </View>
    );
};

export default PlanSelectionCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: 'white',
    // Adjust the height and width to make the card smaller
    height: 75, // Example fixed height
    width: Dimensions.get('window').width - 32, // Some padding from the screen edges
    overflow: 'hidden', // Keep everything within the rounded borders
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Align content to the top
    alignItems: 'flex-start', // Align content to the left
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4, // Add some space between the title and the description
  },
  description: {
    fontSize: 14, // Smaller font size for the description
  },
  cardSelected: {
    backgroundColor: '#e3d8f1', // Background color for selected card
  },
  checkmark: {
    position: 'absolute',
    right: 10, // Closer to the edge
    top: 10, // Closer to the top edge
  },
});