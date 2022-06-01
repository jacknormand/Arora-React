import React, { useState } from 'react';
import { Switch, View , Text , ImageBackground , StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';
//TODO: FIND AUDIO FILE

export default function Walking(){
    const [sound, setSound] = React.useState();
    const [ isPlaying , setisplaying ] = React.useState( false );
    const [ hasStarted, setstart ] = React.useState( false );

    // play sound and pause function all in one for switch
    async function playSound() {
        // start audio if it hasnt started
        if (!hasStarted){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/walkingscreen/mindfulnesswalking.mp3')
             );
             setSound(sound);

             setisplaying( true );
             setstart( true );
     
             await sound.playAsync(); 
        }
        // if not started, load and start
        else if (!isPlaying){
            setisplaying( true );
     
            await sound.playAsync(); 
        }
        // otherwise pause
        else{
            await sound.pauseAsync();
            setisplaying( false );
        }
        
    }
    // KEEP THIS HERE IN CASE WE NEED IT LATER
    // unloads sound to prevent memory leak
    //   React.useEffect(() => {
    //     return sound
    //       ? () => {
    //           sound.unloadAsync(); }
    //       : undefined;
    //   }, [sound]);

    return(
     <View style={ style.main }>
         <ImageBackground source={require('../assets/walkingscreen/walking_background.png')}style={ style.background } resizeMode="cover">
        <Text style={ style.buttonText }>Play/Pause</Text>

        <Switch
        style={style.switchOne}
        trackColor={{ false: "#767577", true: "rgba(35, 151, 216, 0.7)" }}
        thumbColor={isPlaying ? "#64d2b7" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={playSound}
        value={isPlaying}
        />

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

    buttonText:{
        alignSelf: 'center',
        fontSize: 30,
        justifyContent: 'center', bottom: 100,
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white',
    },

    switchOne:{
        justifyContent: 'center', bottom: 50,
    position: 'absolute',
    alignSelf: 'center',
    },

})