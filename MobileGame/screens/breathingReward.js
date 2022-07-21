import React , { useState , useEffect } from 'react'
import { View , StyleSheet , ImageBackground , TouchableOpacity , Image , Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDatabase } from '../network/apiCalls';
import { Button } from 'react-native-paper';
import  LottieView  from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo'

/*
  TODO: FINSISH ANIMATION( 100 or so frames )
        FINISH STYLING AND SUCH
*/

export default function BreathingReward({navigation}){
    const [ pollen , setPollen ] = useState( 0 );
    const [ isConnected , setIsConnected ] = useState( true );

    //const userPointsValue = AsyncStorage.getItem( '@user_points' );
    const getUserItems = async () => {
        await AsyncStorage.getItem( "@user_pollen" ).then(
            value => value != null ? setPollen( parseInt( value ) ) : setPollen( 0 )
        );

        //TODO: Award Points( not in async storage yet )
    }

    // mount and unmount on navigation 
    useEffect(() => {
        //Intial status
        NetInfo.fetch().then( state => {
          if( state.isConnected )
          {
            setIsConnected( true );
          }
          else
          {
            setIsConnected( false );
          }
        });
    
        //Internet connection listener
        NetInfo.addEventListener( state => {
          if( !state.isConnected )
          {
            setIsConnected( false );
          }
          else if( state.isConnected && !isConnected ) // Detect if there was a connection change
          {
            setIsConnected( true );
          }
        });
    
        const unsubscribe = navigation.addListener('focus', () => {
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
        return unsubscribe;
    
      }, [ navigation ]);

    const updatePollenCount = async () => {
        let newCount = pollen + 10;
        await AsyncStorage.setItem( "@user_pollen" , JSON.stringify( newCount ) );
    }


    //On user press, return back to home
    const returnHome = () => {
        updatePollenCount();
        if( isConnected ){
            updateDatabase();
        }
        
        navigation.navigate("Home");
    }
    
    return(
        <View style={ style.main }>
         <LottieView style={ style.background } source={ require('../assets/lottiejson/108108-moving-grass')} resizeMode="cover">
          <LottieView source={require('../assets/lottiejson/25797-concept-floral-branch-butterfly-and-tree.json')} loop autoPlay style={ style.animation }></LottieView>
          <Text style={ style.title }>Congratulations!</Text>
          <Text style={ style.text }>You earned 10 pollen</Text>
          <Text style={ style.text }>New pollen count: { pollen + 10 } </Text>
          <TouchableOpacity onPress={() => returnHome() } style={ style.home }>
            <Text style={ style.homeText }>Home</Text>
          </TouchableOpacity>
         </LottieView>
        </View>
    )
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    home:{
        height: '5%',
        width: '20%',
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        bottom: 0,
    },
    homeText:{
        alignSelf: 'center',
    },
    animation:{
        marginTop: 30,
        position: 'absolute',
        resizeMode: 'contain',
    },
    title:{
        color: 'black',
        marginTop: 50,
        fontSize: 30,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowRadius: 5,
    },
    background:{
        flex: 1,
    },

    bgbg:{
        //backgroundColor: "#005892",
    },
    image:{
        height: '92%',
        width: '100%',
        bottom: 50,
    },
    imageAlt:{
        height: '75%',
        width: '50%',
        alignSelf: 'center',
    },
    text:{
        color: 'black',
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center'
    },
})