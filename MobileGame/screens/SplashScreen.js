import React, { useEffect } from 'react';
import { StyleSheet , View ,Image , Text , Platform } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAPI } from '../network/apiCalls';

export default function SplashScreen({ navigation }){
  let [isLoaded, setIsLoaded] = React.useState(false);
  //Disable android autologin for now
  const platfrom = Platform.OS;

  // i have no idea how this code works but it caches images
  // add images here to cache them
  // TODO: find a way to cache whole assets folder
  let cacheResources = async () => {
    const images = [
    require("../assets/dusk_background.jpg"), 
    require("../assets/loginScreen/orange_butterfly_image.png"),
    require("../assets/atrium_background.jpg"),
    require("../assets/blue_butterfly_image.png"),
    require("../assets/atrium/blue_circle.png"),
    require("../assets/atrium/green_butterfly_image.png"),
    require("../assets/atrium/red_butterfly_image.png"),
    require("../assets/atrium/yellow_butterfly_image.png"),
    require("../assets/atrium/purple_butterfly_image.png"),
    require("../assets/footer/learnIcon.png"),
    require("../assets/footer/butterfly_logo.png"),
    require("../assets/footer/profile_button_unfilled.png"),
    require('../assets/surveryScreen/-2.png'),
    require('../assets/surveryScreen/-1.png'),
    require('../assets/surveryScreen/0.png'),
    require('../assets/surveryScreen/1.png'),
    require('../assets/surveryScreen/2.png'),
    require('../assets/jar_button.png'),
    require('../assets/half_pollen.png'),
    require('../assets/superfly.png'),
    require('../assets/catch_butterfly.png'),
    require('../assets/learnScreen/ic_action_name.png'),
    require('../assets/learnScreen/breath_button.png'),
    require('../assets/learnScreen/mindfullness_meditation_icon.png'),
    require('../assets/learnScreen/location_button.png'),
    require('../assets/breathing/b_frame1.png'),
    require('../assets/breathing/b_frame2.png'),
    require('../assets/breathing/b_frame3.png'),
    require('../assets/breathing/b_frame4.png'),
    require('../assets/breathing/b_frame5.png'),
    require('../assets/breathing/b_frame6.png'),
    require('../assets/breathing/b_frame7.png')
    ];
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  React.useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    };

    loadResources();
  }, [])

  if (!isLoaded) {
    return <AppLoading />
  }

  const userStoredInLocal = async () => {
    //Gather the user info( dont want a user with no creditials to log )
    const user = await AsyncStorage.getItem( '@user' );
    const pass = await AsyncStorage.getItem( '@password' );
    const stayLoggedIn = await AsyncStorage.getItem( '@autoLogin' )
    
    //Check that the user and password is not null and the autologin is on
    if( user != null && pass != null && stayLoggedIn === "true" && platfrom != 'android' ){
      loginAPI( user, pass, navigation )
    }
    else{
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } 
  }
  userStoredInLocal();
    return(
      <View style={ style.main }>
        <Image style={style.launchIcon } source={require('../assets/ic_launcher_round.png')} resizeMode="contain"></Image>
        <Text style={ style.loading }>Loading...</Text>
      </View>
  );
};

const style = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
    },

    launchIcon:{
       marginTop: '50%',
       marginBottom: '50%',
       height: '40%',
       width: '50%'
    },

   loading:{
     fontSize: 30,
     fontWeight: 'bold'
   }
});