import React, { useState , useEffect } from "react";
import { TouchableOpacity , Text , ImageBackground , View , StyleSheet , Image } from "react-native"
import Footer from '../components/Footer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'; 
import { updateDatabase } from '../network/apiCalls'

export default function HomeScreen( { navigation }){
  //hooks to set varible from async storage
    const [ user , setUser ] = React.useState('');
    const [ userPollen , setUserPollen ] = React.useState( 0 );
    //Get user data from async storage
    const getUser = async () =>{
      const username = await AsyncStorage.getItem('@user');
      const pollen = await AsyncStorage.getItem('@user_pollen');
      setUser( username );
      setUserPollen( pollen );
    }
    getUser();
    
    //Gather network info 
    const network = useNetInfo();
    const connectivity = network.isConnected;

    //Set to check network every minute in an interval to update the online database
    function testNetwork(){
      let run = setInterval( function() {
        if( connectivity ){
          updateDatabase(); // This function will consuct api calls update the online database
        }
      }, 60000); // Temp interval 
    }

    testNetwork();

    return(
        <View style={ style.main }>
            <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ style.image }>
              <View style={ style.userInfo }>
                <Text style={ style.userText }>{ user }</Text>
                <Image style={ style.userIcon } source={require('../assets/home/profile_filled_button.png')} resizeMode='contain'/>
              </View>

              <View style={ style.butterflyboxes }>
                <Image style={ style.butterfly } source={require('../assets/loginScreen/orange_butterfly_image.png')} resizeMode='contain'/>
                <View style={ style.boxes }>
                <View style={ style.itemBox }>
                    <Image style={ style.boxIcon } source={require('../assets/half_pollen.png')} resizeMode='contain'/>
                    <Text style={ style.boxText }>Total Pollen Count</Text>
                    <Text style={ style.userPollen }>{userPollen}</Text>
                </View>
                <TouchableOpacity style={style.itemBox} onPress={() => navigation.navigate('Atrium') }>
                      <Image style={ style.boxIcon } source={require('../assets/jar_button.png')} resizeMode='contain'/>
                      <Text style={ style.boxText }>Atrium - View All {'\n'}Butterfies</Text>
                      <Text style={ style.userPollen }>0</Text>
                </TouchableOpacity>
                </View>

              </View>
                <Footer />
            </ImageBackground>
        </View>
    );
};

const style = StyleSheet.create({
    main:{
     flex:1,
    },

    userText:{
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
     },


    userIcon:{
      height: 50,
      width: 50,
    },

     userInfo:{
      position: 'absolute',
      right: 20,
      top: 50,
      color: 'white',
     fontSize: 15,
     fontWeight: 'bold',
     flexDirection: 'row',
     alignItems: 'center',
     },

     butterflyboxes:{
       flex: .87,
       flexDirection: 'column',
       justifyContent: 'center',
       marginTop: 10,
       marginBottom: 10,
     },

     
    boxText:{
      color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    },

    itemBox:{
      height: 80,
      width: "90%",
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 5,
      justifyContent: 'center', 
      marginTop: 10,
    },

    boxes:{
      alignItems: 'center',
    },

    butterfly:{
      height: 250,
      width: 250,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  
     boxIcon:{
      width: 50,
      height: 50,
      resizeMode: 'contain',
      position: 'absolute', left: 20,
    },
  
      userPollen:{
       color: 'white',
       fontSize: 20,
       position: 'absolute', right: 20,
       fontWeight: 'bold',
    },

    image:{
      flex: 1,
    },
});
