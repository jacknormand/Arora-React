import { StyleRounded } from '@material-ui/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useState} from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity , Alert} from 'react-native'
import { Overlay } from 'react-native-elements';
/*
  =================================================
  -FIND OUT WHEN THE USER STOPS HOLDING BUTTON
  -ANIMATION MUST BE SMOOTHER
  -IMPLEMENT THE SCREENS BEFORE AND AFTER THE ACTIVITY
  -EDIT THIS SCREEN TO LOOK LIKE THE ANDROID ONE
  -NEED OVERLAY
  ================================================= 

*/


export default function Breathing(){

    const [ holdSeconds , setHoldSeconds ] = React.useState( 0 );
    const [ shutDown , setShutDown ] = React.useState( true );
    const [ breathCount , setBreathCount ] = React.useState( 5 );
    const [ overlayVisable , setOverlayVisable ] = React.useState( true );

    //For changing text 
    const [ threshold , setThreshold ] = React.useState( false );

    //Update the seconds for every second the user holds button 
    function updateSeconds(){
        let seconds = setInterval( function() {

          //Update second state   
          setHoldSeconds( holdSeconds + 1 );
          
          clearInterval( seconds );

          if( holdSeconds >= 6 ){
              setThreshold( true );
          }
          
          //if the seconds hit max give pollen( whatever the android version did )
          if( holdSeconds === 12 ){
              
              setShutDown( true );

              //Breath count decrease
              setBreathCount( breathCount - 1 );
              
              //Reset the seconds to get back to the first animation
              setHoldSeconds( 0 );

          }
        }, 500);
    }
  
   //Get active animation ( THIS IS BRUTE FORCE )
    var currentAnimation;
    switch( holdSeconds ){
        case 0: 
         currentAnimation = require('../assets/breathing/b_frame1.png');
         break;
        case 1:
         currentAnimation = require('../assets/breathing/b_frame2.png');
         break;
        case 2:
         currentAnimation = require('../assets/breathing/b_frame3.png');
         break;
        case 3:
         currentAnimation = require('../assets/breathing/b_frame4.png');
         break;
        case 4:
         currentAnimation = require('../assets/breathing/b_frame5.png');
         break;
        case 5:
         currentAnimation = require('../assets/breathing/b_frame6.png');
         break;
        case 6:
         currentAnimation = require('../assets/breathing/b_frame7.png');
         break;
        case 7: 
         currentAnimation = require('../assets/breathing/b_frame6.png');
         break;
        case 8:
         currentAnimation = require('../assets/breathing/b_frame5.png');
         break;
        case 9:
         currentAnimation = require('../assets/breathing/b_frame4.png');
         break;
        case 10:
         currentAnimation = require('../assets/breathing/b_frame3.png');
         break;
        case 11:
         currentAnimation = require('../assets/breathing/b_frame2.png');
         break;
    }
    
    //Text for the screen based on seconds
    let displayText = 'Press and hold as you breath in';
    let exhaulText = 'Unhold the button and exhaul';

    //When the breath count hits hit were okay to award 
    if( breathCount === 0 ){
        Alert.alert("Congrats you did the activity" , "reroute" [ { text: 'ok'} ] )
    }
    
    //Check for user holding button 
    if( !shutDown ){
        updateSeconds();
    }

    const setOverlay = () => {
        setOverlayVisable( false );
    }

    return(
     <View style={style.main}>
         <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode='cover' style={style.background}>
         <Overlay style={ style.overlay } isVisible={ overlayVisable } overlayStyle={{width: '90%',height: '90%', backgroundColor:'rgba(0, 245, 196, .50)'}}>
            <Text style={ style.title }>HOW TO PLAY</Text>
                <Image style={ style.snapshot } source={ require("../assets/breathing/breathing_game_snapshot.png")} resizeMode="contain"></Image>
                <Text style={style.overlayText}>Press and hold green button - when you breath in. Release the button when breathing out.</Text>
                <TouchableOpacity style={ style.button } onPress={ setOverlay }>
                    <Text style={ style.buttonText }>CONTINUE</Text>
                </TouchableOpacity>
         </Overlay>
           <Text style={ style.breathCount }>{ breathCount } Breaths</Text>
           <Image source={currentAnimation} style={style.butterfly} resizeMode="contain"></Image>
           <Text style={style.text}>{ threshold ? exhaulText : displayText }</Text>
           <TouchableOpacity onLongPress={() => setShutDown( false )} style={ style.holdBtn }>
               <Text style={style.text}>Hold</Text>
           </TouchableOpacity>
         </ImageBackground>
     </View>
    );
}

const style = StyleSheet.create({
    main:{
        flex:1,
       },
    background:{
        flex: 1,
        alignItems: 'center'
      },
    butterfly:{
        marginTop: '20%',
        marginBottom: '10%',
        height: '50%',
        width: '75%'
      },
    holdBtn:{
        height: '10%',
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    text:{
        color: 'white',
        fontSize: 30,
    },
    breathCount:{
        marginTop: 50,
        fontSize: 30,
        color: 'white',
    },
    overlay:{
        width: '80%',
        height: '90%',
        backgroundColor: 'rgba(0, 245, 196, 0.1)'
    },
    button:{
        height: 75,
        width: 200,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
    },
    buttonText:{
        color: 'white',
        alignSelf: 'center',
    },
    snapshot:{
        alignSelf: 'center',
        height: 600,
        width: 300,
    },
    title:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    overlayText:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
})