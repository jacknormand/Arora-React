import React from 'react'
import { View , ImageBackground , StyleSheet , Text , Image } from 'react-native'

export default function AtriumScreen(){
    return(
      <View style={ style.main }>
          <ImageBackground source={require('../assets/atrium_background.jpg')} style={ style.backgroundImage } resizeMode="cover">
           <Text style={ style.header }>Atrium</Text>
           <View style={ style.atriumContainer }>
               <Image></Image>
               <Image></Image>
               <Image></Image>
               <Image></Image>
               <Image></Image>
           </View>
          </ImageBackground>
      </View>
    );
}

const style = StyleSheet.create({
    main:{
     flex: 1,
    },

    atriumContainer:{
      width: "90%",
      height: "75%",
      backgroundColor: 'rgba(0, 0, 0, 0.14)',
      borderRadius: 6,
    },

    backgroundImage:{
        flex:1,
        alignItems: 'center',
    },

    header:{
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
})