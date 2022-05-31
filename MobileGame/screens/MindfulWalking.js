import React, { useState } from 'react';
import { Animated, View , Text , ImageBackground , StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';
//TODO: FIND AUDIO FILE

export default function Walking(){
    const [sound, setSound] = React.useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../assets/walkingscreen/mindfulnesswalking.mp3')
        );
        setSound(sound);

        await sound.playAsync(); 
    }
    
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);
    
    return(
     <View style={ style.main }>
         <ImageBackground source={require('../assets/walkingscreen/walking_background.png')}style={ style.background } resizeMode="cover">
         <TouchableOpacity style={ style.button } onPressIn={ playSound } onPress={ playSound }>
            <Text style={ style.buttonText }>Begin</Text>
        </TouchableOpacity>

         </ImageBackground>
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

    container:{
        flex: 1,
    },

    button:{
    borderRadius: 15,
    backgroundColor: 'rgba(140, 200, 250, .7)',
    height: 50,
    width: 200,
    justifyContent: 'center', bottom: 30,
    position: 'absolute',
    alignSelf: 'center',
    },

    buttonText:{
        textAlign: 'center',
    }
})