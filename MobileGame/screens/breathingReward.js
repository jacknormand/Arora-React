import React , { useState } from 'react'
import { View , StyleSheet , ImageBackground , TouchableOpacity , Image , Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { updateDatabase , storeUserData } from '../network/apiCalls';

/*
  TODO: FINSISH ANIMATION( 100 or so frames )
        FIGURE OUT HOW TO INSTA UPDATE POLLEN FOR HOMESCREEN 
        FINISH STYLING AND SUCH
*/

export default function BreathingReward(){
    const [ seconds , setSeconds ] = useState( 0 );
    const [ shutDown , setShutDown ] = useState( true );
    const [ outText , setOutText ] = useState( "Click on the pollen pouch" );
    const [ pollenEarned , setPollenEarned ] = useState( "" );
    const [ pollen , setPollen ] = useState( 0 );
    const [ pollenAdded , setPollenAdded ] = useState( "" );
    const [ totalPollen , setTotalPollen ] = useState( "" );
    const [ newCount , setNewCount ] = useState( "" );
    const network = useNetInfo();
    const connectivity = network.isConnected;

    //const userPointsValue = AsyncStorage.getItem( '@user_points' );
    const getUserItems = async () => {
        const pollen = await AsyncStorage.getItem( "@user_pollen" );
        let integerPollen = parseInt( pollen )
        setPollen( integerPollen );
    }

    getUserItems();

    //Check for a connection
    function checkNetworkAndUpdate(){
        if( connectivity ){
            //Update the online database
            updateDatabase();
            
            //Get the new data from database, quick update for home screen 
            storeUserData();
        }
    }
    
    //Update seconds
    function updateSeconds(){
        let interval = setInterval( function() {
            setSeconds( seconds + 1 );
            clearInterval(interval);
            if( seconds === 10 ){
                let newPollenCount = pollen + 10;
                updatePollen();
                setOutText("Well Done!");
                setPollenEarned("Pollen Earned:");
                setPollenAdded("10");
                setTotalPollen("Total pollen:");
                setNewCount( String( newPollenCount ) );
                setShutDown( true );
                checkNetworkAndUpdate();
            }
        }, 500);
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
    
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.background } source={ require('../assets/dusk_background.jpg')} resizeMode="cover">
          <Text style={ style.title }>{ outText }</Text>
          <View style={ style.inline }>
            <Text style={ style.text }>{ pollenEarned }</Text>
            <Text style={ style.text }>{ pollenAdded }</Text>
          </View>
          <View>
            <Text style={ style.text }>{ totalPollen }</Text>
            <Text style={ style.text }>{ newCount }</Text>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => setShutDown( false )}>
            <Image style={ style.image } source={ background } resizeMode="contain"></Image>
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
        marginTop: 30,
        alignSelf: 'center',
    },
    background:{
        flex: 1,
    },
    image:{
        height: "100%",
        width: "100%",
    },
    text:{
        color: 'white',
        fontSize: 20,
    },
})