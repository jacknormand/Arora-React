import React , { useState } from 'react'
import { View , StyleSheet , ImageBackground , TouchableOpacity , Image , Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function BreathingReward(){
    const [ seconds , setSeconds ] = useState( 0 );
    const [ shutDown , setShutDown ] = useState( true );
    const [ outText , setOutText ] = useState("Click on the pollen pouch");
    const [ pollenEarned , setPollenEarned ] = useState("");
    const [ pollenAdded , setPollenAdded ] = useState("");
    const [ totalPollen , setTotalPollen ] = useState("");
    const [ userPollen , setUserPollen ] = useState(0);
    const [ newCount , setNewCount ] = useState("");
    
    //Pollen count returns NULL this needs to be fixed 
    const getPollen = async () => {
     const pollen = await AsyncStorage.getItem('@user_pollen');
     setUserPollen( pollen );
    }

    getPollen();
    
    //Update seconds
    function updateSeconds(){
        let interval = setInterval( function() {
            setSeconds( seconds + 1 );
            clearInterval(interval);
            if( seconds === 9 ){
                updatePollen();
                setOutText("Well Done!");
                setPollenEarned("Pollen Earned:");
                setPollenAdded("10");
                setTotalPollen("Total pollen:");
                setNewCount( "25" );
                setShutDown( true );
            }
        }, 500);
    }

    //Give user 10 pollen upon activity completion 
    const updatePollen = async ( userPollenCount ) => {
      let newPollenCount = parseInt( userPollenCount );
      newPollenCount = newPollenCount + 10;
      await AsyncStorage.setItem( '@user_pollen' , JSON.stringify( newPollenCount ) );
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