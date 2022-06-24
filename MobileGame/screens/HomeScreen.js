import React, { useEffect, useState , useCallback } from "react";
import { Alert, TouchableOpacity , Text , ImageBackground , View , StyleSheet , Image } from "react-native"
import Footer from '../components/Footer'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen( { navigation }){
    //hooks to set varible from async storage
    var interval; 
    const [ user , setUser ] = useState('');
    const [ userPollen , setUserPollen ] = useState( 0 );
    const [ logoutUser , setLogoutUser ] = useState( false );
    
    
    //Get user data from async storage
    const getUser = () => {
      AsyncStorage.getItem( '@user' ).then( value => setUser( value ) );
      AsyncStorage.getItem( '@user_pollen' ).then( value => setUserPollen( value ) );
    }

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getUser();
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount( No render on logout event )
      return unsubscribe;
    }, [ navigation ]);

    function logoutCheck(){
      Alert.alert(
        user+"'s Profile",
        "What would you like to do?",
        [
          { text: "Cancel" },
          { text: "Log Out",
            onPress: () => setLogoutUser( true )}
        ]
      );
    }

    //on log out destruct async values
    const logout = async () => {
      await AsyncStorage.setItem( '@is_logged_in' , JSON.stringify( false ) );
      await AsyncStorage.setItem( '@autoLogin' , JSON.stringify( false ) );
      await AsyncStorage.setItem( '@start_new_chat' , JSON.stringify( false ) );
      
      // Create a list of values to be removed
      let dataToBeRemoved = [
      '@user',
      '@password',
      '@userId',
      '@user_pollen',
      '@userToken',
      '@user_b0_count',
      '@user_b1_count',
      '@user_b2_count',
      '@user_b3_count',
      '@user_b4_count',
      '@current_butterfly',
      '@user_current_mood',
      '@user_current_mood_updated',
      '@mood_type',
      '@stress_type',
      '@convo_id'
     ];

      await AsyncStorage.multiRemove( dataToBeRemoved );
    }

    //Wait for async func to complete then naviagte
    if( logoutUser ){
      logout().then(() => {
        navigation.navigate('Login')
      })
    }


     
    return(
        <View style={ style.main }>
            <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ style.image }>
              <TouchableOpacity style={ style.userInfo } onPress={() => logoutCheck()}>
                <Text style={ style.userText }>{ user }</Text>
                <Image style={ style.userIcon } source={require('../assets/home/profile_filled_button.png')} resizeMode='contain'/>
              </TouchableOpacity>

              <View style={ style.butterflyboxes }>
                <Image style={ style.butterfly } source={require('../assets/loginScreen/orange_butterfly_image.png')} />
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
     zIndex: 1,
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
