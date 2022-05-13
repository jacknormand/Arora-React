import React from 'react';
import { StyleSheet , View ,Image } from 'react-native';

export default function SplashScreen({ navigation }){
    setTimeout(() => {
        navigation.navigate("Login");
    }, 3000);  
  
    return(
      <View style={ style.main }>
        <Image style={style.launchIcon } source={require('../assets/ic_launcher_round.png')} resizeMode="contain"></Image>
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
});