import React , {useState} from 'react';
import { Easing, Animated, View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements';
import  LottieView  from 'lottie-react-native';

/*
  =================================================
  -ANIMATION MUST BE SMOOTHER
  -Warning on completion is fine, if not we can fix later
  ================================================= 

*/


export default function Breathing({ navigation }){
    //create states 
    const [ holdSeconds , setHoldSeconds ] = React.useState( 0 );
    const [ shutDown , setShutDown ] = React.useState( true );
    const [ breathCount , setBreathCount ] = React.useState( 5 );
    const [ overlayVisable , setOverlayVisable ] = React.useState( true );
    const [ restart , setRestart ] = React.useState( false );
    //For changing text 
    const [ threshold , setThreshold ] = React.useState( false );
    
    
    //Restart the animation when the user lets go of the button 
    const restartAnimation = () => {
        //User doesn't need to hold the button when butterfly reaches last frame
        if( holdSeconds <= 6 ){
         setRestart( true );
         setShutDown( true );
         setHoldSeconds( 0 );
        }
    }

    //Start up the animation sequence 
    const startAnimation = () => {
        setHoldSeconds( 0 );
        setRestart( false );
        setShutDown( false );
    }

    //Update the seconds for every second the user holds button 
    function updateSeconds(){
        if( !shutDown ){
         let seconds = setInterval( function() {

           //Update second state   
           setHoldSeconds( holdSeconds + 1 );

           //clear the interval
           clearInterval( seconds );

           //Used to detect text change
           if( holdSeconds >= 6 ){
              setThreshold( true );
           }
           else{
              setThreshold( false );
           }
          
           //On last frame restart the seconds and decrease the breath count
           if( holdSeconds === 12 ){
              //restart to avoid extra frame from switch statement
              setRestart( true );

              //Breath count decrease
              setBreathCount( breathCount - 1 );
              
              //Reset the seconds to get back to the first animation
              setHoldSeconds( 0 );

              //clear the interval
              clearInterval( seconds );

              //shutDown so animation is not continous
              setShutDown( true );
          }
         }, 500); // Temp interval
        }
    }
  
   //Get active animation ( THIS IS BRUTE FORCE ), Where are the rest of the frames?
   // Not to be the final animation.
    
    var currentAnimation;
    if( !restart ){
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
        case 12:
         currentAnimation = require('../assets/breathing/b_frame1.png');
         break;
      }
    }
    else{
        currentAnimation = require('../assets/breathing/b_frame1.png');
    }

    //Text for the screen based on seconds
    let displayText = 'Press and hold \nas you breathe in';
    let exhaulText = 'Release the button and exhale';

    //Detect if the overlay should be visable
    const setOverlay = () => {
        setOverlayVisable( false );
    }
    
    //When activity is done, award the user
    const navigate = () => {
      if( breathCount === 0 ){
        navigation.navigate("BreathingReward");
      }
    }
    
    //navigate to the reward screen
    navigate();

    //Update the seconds per onPress event
    updateSeconds();


    return(
     <View style={style.main}>
         <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode='cover' style={style.background}>
             <LottieView source={require('../assets/breathing/river.json')} loop autoPlay style={style.river}></LottieView>
         
         <Overlay style={ style.overlay } isVisible={ overlayVisable } overlayStyle={{width: '90%',height: '90%', backgroundColor:'rgba(0, 245, 196, .7)'}}>
             <View style={style.overlay}>
            <Text style={ style.title }>HOW TO PLAY</Text>
                <Image style={ style.snapshot } source={ require("../assets/breathing/breathing_game_snapshot.png")} resizeMode="contain"></Image>
                <Text style={style.overlayText}>Press and hold green button - when you breath in. Release the button when breathing out.</Text>
                <TouchableOpacity style={ style.button } onPress={ setOverlay }>
                    <Text style={ style.buttonText }>CONTINUE</Text>
                </TouchableOpacity>
                </View> 
         </Overlay>
         <View style={style.allitems}>
           <Text style={ style.breathCount }>{ breathCount } Breaths</Text>
           <Image source={currentAnimation} style={style.butterfly} resizeMode="contain"></Image>
           <Text style={style.text}>{ threshold ? exhaulText : displayText }</Text>
           <TouchableOpacity onLongPress={() => startAnimation() } onPressOut={() => restartAnimation( ) }>
               <Image source={ require("../assets/breathing/breathing_button.png")} style={ style.breathbutton }></Image>
           </TouchableOpacity>

           </View>

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
        alignItems: 'center',
        justifyContent: 'center',
      },
    butterfly:{
        height: '50%',
        width: '75%'
      },

      river:{
          width: "110%",
          position: "absolute",
          height: "110%",
      },

      allitems:{
        flex: 1,
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems:'center',
        justifyContent:'space-evenly',
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
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 5,
    },
    breathCount:{
        marginTop: 50,
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 5,
    },
    overlay:{
        width: '80%',
        height: '90%',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
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
    breathbutton:{
      height: 200,
      width: 200,
      justifyContent: 'center',
      position: 'relative',
      alignSelf: 'center',

    },
    snapshot:{
        alignSelf: 'center',
        height: "60%",
    },
    title:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 5,
    },
    overlayText:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowRadius: 5,
    }
})