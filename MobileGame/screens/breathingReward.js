import React , { useState } from 'react'
import { View , StyleSheet , ImageBackground , TouchableOpacity , Image , Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { updateDatabase } from '../network/apiCalls';
import { Button } from 'react-native-paper';

/*
  TODO: FINSISH ANIMATION( 100 or so frames )
        FINISH STYLING AND SUCH
*/

export default function BreathingReward({navigation}){
    const [ seconds , setSeconds ] = useState( 0 );
    const [ shutDown , setShutDown ] = useState( true );
    const [ outText , setOutText ] = useState( "Click on the pollen pouch" );
    const [ pollenEarned , setPollenEarned ] = useState( "" );
    const [ pollen , setPollen ] = useState( 0 );
    const [ pollenAdded , setPollenAdded ] = useState( "" );
    const [ totalPollen , setTotalPollen ] = useState( "" );
    const [ newCount , setNewCount ] = useState( "" );
    const [ imageChange , setImageChange ] = useState( false );
    const [ returnHomeText , setReturnHome ] = useState('');
    const network = useNetInfo();
    const connectivity = network.isConnected;

    //const userPointsValue = AsyncStorage.getItem( '@user_points' );
    const getUserItems = async () => {
        const pollen = await AsyncStorage.getItem( "@user_pollen" );
        let integerPollen = parseInt( pollen )
        setPollen( integerPollen );

        //TODO: Award Points( not in async storage yet )
    }

    getUserItems();

    //Check for a connection
    function checkNetworkAndUpdate(){
        if( connectivity ){
            //Update the online database
            updateDatabase();
        }
    }
    
    //Update seconds
    function updateSeconds(){
        let interval = setInterval( function() {
            setSeconds( seconds + 1 );
            clearInterval(interval);
            if( seconds === 10 ){
                let newPollenCount = pollen + 10;
                setImageChange( true );
                updatePollen();
                setOutText("Well Done!");
                setPollenEarned("Pollen Earned:");
                setPollenAdded("10");
                setTotalPollen("Total pollen:");
                setNewCount( String( newPollenCount ) );
                setReturnHome("Home");
                clearInterval( interval );
                setShutDown( true );
                checkNetworkAndUpdate();
            }
        }, 150);
    }

    //Give user 10 pollen upon activity completion 
    const updatePollen = async () => {
      let newPollenCount = pollen + 10;
      //Store the user new pollen count 
      await AsyncStorage.setItem( '@user_pollen' , JSON.stringify( newPollenCount ) );

      //Award user_points
      //const pointsAwarded = 1;
      //let newUserPoints = parseInt( userPointsValue );
      //let newPoints = newUserPoints + pointsAwarded;
      //await AsyncStorage.setItem( '@user_points' , JSON.stringify( newPoints ) );
    }

    //when all images are imorted this function will generate the image file path 
    const getImage = ( seconds ) => {
        let totalFrames = 108;
        let frameImg = '../assets/breathing/pollen2_'
        for( count = 0; count < totalFrames; count++ ){
            if( frame < 10 ){
                let currentFrame = frameImg + '0000' + seconds.toString
            }
            else if( frame > 9 && frame < 100 ){
                let currentFrame = frameImg + '000' + seconds.toString
            }
            else{
                let currentFrame = frameImg + '00' + seconds.toString
            }
            frame++;
        }
        return currentFrame;
    }

    //let background = getImage( seconds ); 
    
    
    var background;

    //temp until we import all animation frames 
    switch( seconds ){
      case 0:
          background = require('../assets/breathing/pollen2_00000.png');
          break;
      case 1:
          background = require('../assets/breathing/pollen2_00003.png');
          break;
      case 2:
          background = require('../assets/breathing/pollen2_00020.png');
          break;
      case 3:
          background = require('../assets/breathing/pollen2_00021.png');
          break;
      case 4: 
          background = require('../assets/breathing/pollen2_00022.png');
          break;
      case 5: 
          background = require('../assets/breathing/pollen2_00023.png');
          break;
      case 6: 
          background = require('../assets/breathing/pollen2_00024.png');
          break;
      case 7:
          background = require('../assets/breathing/pollen2_00025.png');
          break;
      case 8: 
          background = require('../assets/breathing/pollen2_00030.png');
          break;
      case 9:
          background = require('../assets/breathing/pollen2_00091.png');
          break;
      case 10:
          background = require("../assets/breathing/pollen_pouch.png");
          break;
    }

    //On press to evaulate to true and start animation 
    if( !shutDown ){
        updateSeconds();
    }

    //On user press, return back to home
    const returnHome = () => {
        navigation.navigate("Home");
    }
    
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.background } source={ require('../assets/dusk_background.jpg')} resizeMode="cover">
          <Text style={ style.title }>{ outText }</Text>
          <Text style={ style.text }>{ pollenEarned } { pollenAdded } </Text>
          <Text style={ style.text }>{ totalPollen } { newCount }</Text>

          <Button icon="home-outline" mode="contained" style={style.backButton} 
          onPress={() => returnHome()}
          color='rgba(0, 0, 0, 0.3)'>{returnHomeText}
          </Button>
          <TouchableOpacity activeOpacity={1} onPress={() => setShutDown( false )}>
            <Image style={ !imageChange ? style.image : style.imageAlt } source={ background } resizeMode="contain"></Image>
          </TouchableOpacity>


         </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    title:{
        color: 'white',
        fontSize: 30,
        marginTop: 50,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 5,
    },
    background:{
        flex: 1,
    },
    image:{
        height: '92%',
        width: '100%',
    },
    imageAlt:{
        height: '75%',
        width: '50%',
        alignSelf: 'center',
        bottom: 0,
    },
    text:{
        color: 'white',
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center'
    },
    backButton:{
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute', bottom: 10,
        borderRadius: 15,
        },
})