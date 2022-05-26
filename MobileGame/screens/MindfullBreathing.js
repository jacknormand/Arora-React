import React , {useState} from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity , Alert} from 'react-native'

/*
  =================================================
  -FIND OUT WHEN THE USER STOPS HOLDING BUTTON
  -ANIMATION MUST BE SMOOTHER
  -IMPLEMENT THE SCREENS BEFORE AND AFTER THE ACTIVITY
  -EDIT THIS SCREEN TO LOOK LIKE THE ANDROID ONE
  ================================================= 

*/


export default function Breathing(){

    const [ holdSeconds , setHoldSeconds ] = React.useState( 0 );
    const [ opacityHeld , setOpacityHeld ] = React.useState( false );
    const [ shutDown , setShutDown ] = React.useState( false );
    //For changing text 
    const [ threshold , setThreshold ] = React.useState( false );

    //Update the seconds for every second the user holds button 
    function updateSeconds(){
        let seconds = setInterval( function() {
         if( !shutDown ){
          //Update second state   
          setHoldSeconds( holdSeconds + 1 );
          
          clearInterval( seconds );

          if( holdSeconds >= 6 ){
              setThreshold( true );
          }
          
          //if the seconds hit max give pollen( whatever the android version did )
          if( holdSeconds === 12 ){
              Alert.alert("Congrats you did the activity" , "reroute" [ { text: 'ok'} ] )

              // After activity is done shut off animation
              setShutDown( true );
              
              //Reset the seconds to get back to the first animation
              setHoldSeconds( 0 );
          }
         }
        }, 500); // Run every second  
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
    
    //Check for user holding button 
    if( opacityHeld === true ){
        updateSeconds();
    }

    return(
     <View style={style.main}>
         <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode='cover' style={style.background}>
           <Image source={currentAnimation} style={style.butterfly} resizeMode="contain"></Image>
           <Text style={style.text}>{ threshold ? exhaulText : displayText }</Text>
           <TouchableOpacity onLongPress={() => setOpacityHeld( true )} style={ style.holdBtn }>
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
        marginTop: '50%',
        marginBottom: '50%',
        height: '40%',
        width: '50%'
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
    }
})