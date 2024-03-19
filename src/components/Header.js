import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const Header = () => {
  return (
    <View style={{
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {
            height: -6
        },
        shadowColor: 'black',
        height: 70
    }}>
        <Image
            source={require('../assets/PFPLogo300px.png')}
        />
    </View>
  )
}

export default Header