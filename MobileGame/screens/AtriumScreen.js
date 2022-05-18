import React from 'react'
import { View , ImageBackground , StyleSheet , Text , Image } from 'react-native'

export default function AtriumScreen(){
    return(
      <View style={ style.main }>
          <ImageBackground source={require('../assets/atrium_background.jpg')} style={ style.backgroundImage } resizeMode="cover">
           <Text style={ style.header }>Atrium</Text>
           <View style={ style.atriumContainer }>
             <View style={ style.align }>
               <Image style={ style.butterflies } source={require('../assets/atrium/green_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/red_butterfly_image.png')} resizeMode="contain" />
             </View>
             <View style={ style.align }>
               <Image style={ style.butterflies } source={require('../assets/atrium/yellow_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/purple_butterfly_image.png')} resizeMode="contain" />
             </View>
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
   
       butterflyEnd:{
        position: 'absolute',
        right: 0,
        height: 120,
        width: 120,
        marginRight: 30,
       },
   
       align:{
           flexWrap: 'wrap',
           flexDirection: 'row',
       },
   
       butterflies:{
         height: 120,
         width: 120,
         marginLeft: 30,
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