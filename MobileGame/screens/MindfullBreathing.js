import React , {useState, useRef } from 'react';
import { Animated, View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native'
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
    const [ breathCount , setBreathCount ] = useState( 5 );
    const [ overlayVisable , setOverlayVisable ] = useState( true );
    //For changing text  and anim
    const [ threshold , setThreshold ] = useState( false );
    const translation = useRef(new Animated.Value(1)).current;
    const [ needreward , setneedreward ] = useState( true );
    
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

    translation.addListener(({value}) =>{
        if(needreward === true && value<=.25){
          //setBreathCount( breathCount - 1 ); 
          setneedreward(false);
        }
      });

    const subtractBreath = () => {
     setTimeout(() => {
        setBreathCount( breathCount - 1 );
        setThreshold( false );
     }, 2000)
    }


    const pressed = () => {
        setThreshold(false);
        Animated.timing(translation, {
            duration: 3500,
            toValue: .25,
            useNativeDriver: true,
        }
        ).start(() => {setThreshold(true)});
    };

    const released = () => {
        Animated.timing(translation, {
            duration: 2000,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {setThreshold(false)});

        if( threshold ){
            subtractBreath();
        }
    };



    //onPressOut={() => restartAnimation( ) } this goes in touchable opacity
    // on long press start animation

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

           {/* <Image source={currentAnimation} style={style.butterfly} resizeMode="contain"></Image> */}
           <Animated.Image source={ require("../assets/breathing/b_frame1.png")} resizeMode="contain"
           style={{
            height: '25%',
            transform: [{ scaleX: translation }],
          }}></Animated.Image>

           <Text style={style.text}>{ threshold ? exhaulText : displayText }</Text>
           <TouchableOpacity onPressIn={ pressed } onPressOut={ released }>
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
        width: '75%',
      },

      river:{
          width: "100%",
          position: "absolute",
          height: "105%",
          resizeMode: 'cover',
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