import React, { useEffect } from 'react';
import { StyleSheet , View ,Image , Text } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

export default function SplashScreen({ navigation }){
  let [isLoaded, setIsLoaded] = React.useState(false);
  let [ loadBar , setLoadBar ] = React.useState( 0 );

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

  setTimeout(() => {
      navigation.navigate("Login");
  }, 2000);  
  
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