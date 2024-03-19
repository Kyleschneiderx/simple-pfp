// import React, {useState} from 'react';
// import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
// import { Video } from 'expo-av';

// const shadowStyle = {
//   shadowColor: '#171717',
//   shadowOffset: { width: -2, height: 4 },
//   shadowOpacity: 0.2,
//   shadowRadius: 3,
//   borderRadius: 10,
// };

// const ExerciseDetails = ({ title, video, daily, weekly, reps, sets, description, onCompleteCard, cardIndex}) => {

//     const [activeCardIndex, setActiveCardIndex] = useState(0);
//     const [cardCompletionStatus, setCardCompletionStatus] = useState([]) // Initialize with all cards incomplete);


//     const handleCompletePress = () => {
        
//         onCompleteCard();
//         setCardCompletionStatus([...cardCompletionStatus, cardIndex]); // Mark the current card as complete

//          // Call the function when the user marks the card as complete
        
//     }
//     console.log(cardCompletionStatus)

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
      
//       <Video
//         source={{ uri: video }}
//         style={[styles.video, shadowStyle]}
//         useNativeControls
//       />
      
//       <View style={styles.details}>
//         <DetailsSpec label="Daily" value={daily} />
//         <DetailsSpec label="Weekly" value={weekly} />
//         <DetailsSpec label="Reps" value={reps} />
//         <DetailsSpec label="Sets" value={sets} />
//       </View>
      
//       <Text style={styles.text}>Instructions</Text>
//       <Text>{description}</Text>
//       {!cardCompletionStatus.includes(cardIndex) ?
//         <TouchableOpacity onPress={handleCompletePress} style={styles.completeButton}>
//             <Text style={styles.completeButtonText}>Mark as Complete</Text>
//         </TouchableOpacity>
//        :
//        <TouchableOpacity onPress={handleCompletePress} style={styles.completeButton}>
//             <Text style={styles.completeButtonText}>Completed</Text>
//         </TouchableOpacity> 
//        }

//     </View>
//   );
// };

// const DetailsSpec = ({ label, value }) => {
//   return (
//     <View style={styles.specs}>
//       <Text>{label}</Text>
//       <Text>{value}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 10,
//     ...shadowStyle,
//     paddingVertical: 20,
//     paddingHorizontal: 45,
//     width: '100%',
//     marginVertical: 10,
//     backgroundColor: "white",
//     width: Dimensions.get('window').width - 50,
//     height: Dimensions.get('window').height - 250,
//   },
//   video: {
//     width: 250,
//     height: 150,
//   },
//   details: {
//     flexDirection: "row",
//   },
//   specs: {
//     padding: 5,
//     margin: 5,
//     backgroundColor: "#e3d8f1",
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 60,
//     width: 60,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: '800',
//     marginBottom: 5,
//     justifyContent: 'flex-start',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 5,
//     justifyContent: 'flex-start',
//   },
//   completeButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#e3d8f1",
//     borderRadius: 6,
//     alignSelf: 'center',
//   },
//   completeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ExerciseDetails;

import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';

const shadowStyle = {
  shadowColor: '#171717',
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  borderRadius: 10,
};

const ExerciseDetails = ({
  title,
  video,
  daily,
  weekly,
  reps,
  sets,
  description,
  onCompleteCard,
  cardIndex,
}) => {
  const [cardCompletionStatus, setCardCompletionStatus] = useState([]);
  const isCardCompleted = cardCompletionStatus.includes(cardIndex);

  const handleCompletePress = () => {
    onCompleteCard();
    setCardCompletionStatus([...cardCompletionStatus, cardIndex]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Video source={{ uri: video }} style={[styles.video, shadowStyle]} useNativeControls />

      <View style={styles.details}>
        <DetailsSpec label="Daily" value={daily} />
        <DetailsSpec label="Week" value={weekly} />
        <DetailsSpec label="Reps" value={reps} />
        <DetailsSpec label="Sets" value={sets} />
      </View>

      <Text style={styles.text}>Instructions</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
    </View>

      <TouchableOpacity
        onPress={handleCompletePress}
        style={[styles.completeButton, isCardCompleted && styles.completedButton]}
      >
        <Text style={styles.completeButtonText}>
          {isCardCompleted ? 'Completed' : 'Mark as Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailsSpec = ({ label, value }) => {
  return (
    <View style={styles.specs}>
    <Text style={styles.specValue}>{value}</Text>
      <Text style={styles.specLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    ...shadowStyle,
    paddingVertical: 20,
    paddingHorizontal: 45,
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 250,
  },
  video: {
    width: 250,
    height: 150,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  specs: {
    padding: 5,
    margin: 5,
    backgroundColor: '#e3d8f1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  specLabel: {
    fontWeight: 'bold',
  },
  specValue: {
    marginTop: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
  completeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#a397c8',
    borderRadius: 6,
    alignSelf: 'center',
  },
  completedButton: {
    backgroundColor: '#e3d8f5',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 15,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ExerciseDetails;
