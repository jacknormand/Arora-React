import React, { useState } from 'react';
import { Switch, View , Text , ImageBackground , StyleSheet } from 'react-native'
import { Button, ToggleButton } from 'react-native-paper';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-web';
//TODO: GIVE REWARD FOR LISTENING

export default function Walking({ navigation }){
    const [sound, setSound] = useState();
    const [ isPlaying , setisplaying ] = useState( false );
    const [ hasStarted, setstart ] = useState( false );
    const [ icon, seticon ] = useState( "play" );
    const [ isdisabled, setisdisabled ] = useState( true );

    // play sound and pause function all in one for switch
    async function playSound() {
        // start audio if it hasnt started
        if (!hasStarted){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/walkingscreen/mindfulnesswalking.mp3')
             );
             // set stuff
             setSound(sound);
             setisplaying( true );
             setstart( true );
             seticon( 'pause' );
     
             await sound.playAsync(); 

             setTimeout(() => {
                setisdisabled(false);
              }, 20000);
        }
        // if not started, load and start
        else if (!isPlaying){
            setisplaying( true );
            seticon( 'pause' );
            await sound.playAsync(); 
        }
        // otherwise pause
        else{
            seticon( 'play' );
            await sound.pauseAsync();
            setisplaying( false );
        }
        
    }
    // ends sound and then navigates out
    async function someThings(navigation){
        await sound.pauseAsync();
        await sound.unloadAsync();
        navigation.navigate("BreathingReward");
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
         <Button icon="arrow-left" mode="contained" style={style.backButton} 
                    onPress={() => navigation.goBack()}
                    color='rgba(0, 0, 0, 0.0)'>Back
        </Button>

        <Button icon="checkbox-marked-circle" mode="contained" style={style.forwardButton} 
                    onPress={() => someThings(navigation)}
                    color='rgba(247, 255, 63, 1)'
                    disabled={isdisabled}>Reward
        </Button>
        <Text style={ style.buttonText }>Play/Pause</Text>

        {/* <Switch
        style={style.switchOne}
        trackColor={{ false: "#767577", true: "rgba(35, 151, 216, 0.7)" }}
        thumbColor={isPlaying ? "#64d2b7" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={playSound}
        value={isPlaying}
        /> */}


        <ToggleButton icon={icon} mode="contained" style={style.playpause}
        onPress={() => playSound()}
        color='rgba(255, 255, 255, 1)'
        size = {100}
        status = {isPlaying}/>


        

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
        height: "101%",
    },

    container:{
        flex: 1,
    },

    buttonText:{
        alignSelf: 'center',
        fontSize: 30,
        justifyContent: 'center', bottom: 150,
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white',
    },

    switchOne:{
        justifyContent: 'center', bottom: 50,
    position: 'absolute',
    alignSelf: 'center',
    },

    playpause:{
    justifyContent: 'center', bottom: 50,
    position: 'absolute',
    alignSelf: 'center',
    height: 100,
    width: 100,
    },

    backButton:{
        position: 'absolute', left: 10, bottom: 55,
        borderRadius: 15,
        },

    forwardButton:{
        position: 'absolute', right: 10, bottom: 55,
        borderRadius: 15,
        },

})