import React , { useState } from 'react'
import { View , ImageBackground , StyleSheet , Text , Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { increaseUserPollenCount } from '../network/apiCalls';

export default function AtriumScreen(){
  //Set the user butterfly counts for all atrium
  const [ b0 , setB0 ] = React.useState( 0 );
  const [ b1 , setB1 ] = React.useState( 0 );
  const [ b2 , setB2 ] = React.useState( 0 );
  const [ b3 , setB3 ] = React.useState( 0 );
  const [ b4 , setB4 ] = React.useState( 0 );
  const getUserButterflies = async () => {
    //gather the user butterfly amount from storage
    const butterflyZero = await AsyncStorage.getItem( '@user_b0_count' );
    const butterflyOne = await AsyncStorage.getItem( '@user_b1_count' );
    const butterflyTwo = await AsyncStorage.getItem( '@user_b2_count' );
    const butterflyThree = await AsyncStorage.getItem( '@user_b3_count' );
    const butterflyFour = await AsyncStorage.getItem( '@user_b4_count' );
    //update state
    setB0( butterflyZero );
    setB1( butterflyOne );
    setB2( butterflyTwo );
    setB3( butterflyThree );
    setB4( butterflyFour );
  }
  getUserButterflies();
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