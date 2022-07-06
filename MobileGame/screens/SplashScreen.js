import React from 'react';
import { StyleSheet , View ,Image , Text , Platform } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAPI } from '../network/apiCalls';
import { ActivityIndicator } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo'; 


export default function SplashScreen({ navigation }){
  let [isLoaded, setIsLoaded] = React.useState(false);
  //Disable android autologin for now
  const platform = Platform.OS;
  const network = useNetInfo();
  const connection = network.isConnected;

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
    require('../assets/breathing/b_frame7.png'),
    require('../assets/orange_mountain_background.png'),
    require('../assets/play_button.png'),
    require("../assets/breathing/breathing_game_snapshot.png"),
    require('../assets/home/profile_filled_button.png'),
    require('../assets/breathing/breathing_button.png'),
    require('../assets/breathing/background_breathing.png')
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
    await AsyncStorage.getItem( '@user' ).then( value => user = value );
    await AsyncStorage.getItem( '@password' ).then( value => pass = value );
    await AsyncStorage.getItem( '@autoLogin' ).then( value => stayLoggedIn = value );
    
    //Check that the user and password is not null and the autologin is on( disabled on adroid till proof it 100% works )
    if( connection && user != null && pass != null && stayLoggedIn === "true" ){
      loginAPI( user, pass, navigation )
    }
    //If there is no internet connection then allow user acess
    else if( user != null && pass != null && !connection ){
      setTimeout(() => {
        navigation.navigate("Wellness");
      }, 2200 );
    }
    else{
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2200);
    } 
  }
  userStoredInLocal();
    return(
      <View style={ style.main }>
        <Image style={style.launchIcon } source={require('../assets/ic_launcher_round.png')} resizeMode="contain"></Image>
        <ActivityIndicator style={style.loading}size='large' animating={true} color='#47be83' />
      </View>
  );
};

const style = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    launchIcon:{
       height: 150,
       width: 150
    },

   loading:{
    justifyContent: 'center', bottom: 100,
    position: 'absolute',
    alignSelf: 'center',
   }
});