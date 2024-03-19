import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React from 'react'

const ExcerciseCard = ({title, onPress}) => {
  return (
    <View style={styles.container}>
        <Pressable
        android_ripple={{color : '#ccc'}}
        style={({pressed})=>[
            styles.button,
            pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
        >
        <View style={styles.innerContainer} >
            <Text style={styles.title}>{title}</Text>
        </View>

        </Pressable>     
    </View>
  )
}

export default ExcerciseCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:16,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset:{ width: 0, height: 2},
        shadowRadius: 8,
        backgroundColor: 'white',
        height: (Dimensions.get('window').height - 310)/4,
        width: Dimensions.get('window').width -50,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'

    },
    button:{
        flex:1
    },
    buttonPressed:{
        opacity:0.5

    },
    innerContainer:{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    title:{
        fontSize:25,
        fontWeight: 'bold'
    }

})