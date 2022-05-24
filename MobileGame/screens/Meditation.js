import React from 'react';
import { View , Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
/*
  =============================================

  THIS IS A TEMP LOCATION FOR LOGOUT BUTTON

  =============================================
*/

export default function Meditation({navigation}){
    const logout = async () => {
     await AsyncStorage.removeItem('@autoLogin');
     await AsyncStorage.removeItem('@user');
     await AsyncStorage.removeItem('@password');
     navigation.navigate("Login")
    }
    return(
     <TouchableOpacity onPress={() => logout()} style={ style.logoutbutton}>
         <Text style={style.text}>logout</Text>
     </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    logoutbutton:{
        marginTop: 100,
        height: 50,
        width: 100,
        marginLeft: 200,
        backgroundColor: 'black',
        color: 'white',
    },
    text:{
     color: 'white'
    }
})