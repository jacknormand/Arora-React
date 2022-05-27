import React from 'react';
import { View , Text , ImageBackground , StyleSheet } from 'react-native'

//TODO: FIND AUDIO FILE

export default function Walking(){
    /*
    let audio = new Audio(//mp3 file)
    audio.play()
    */
    return(
     <View style={ style.main }>
         <ImageBackground source={require('../assets/orange_mountain_background.png')}style={ style.background } resizeMode="cover"></ImageBackground>
     </View>
    );
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    background:{
        flex: 1,
    },
})