import React , { useState } from 'react'
import { View , ImageBackground , StyleSheet , Text , Image , Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  TODO: Use the corresponding butterfly values for the amount of specific butterflies
*/
export default function AtriumScreen(){
  //Set the user butterfly counts for all atrium
  const [ b0 , setB0 ] = React.useState( 0 );
  const [ b1 , setB1 ] = React.useState( 0 );
  const [ b2 , setB2 ] = React.useState( 0 );
  const [ b3 , setB3 ] = React.useState( 0 );
  const [ b4 , setB4 ] = React.useState( 0 );
  const [ firstTimeLogin , setFirstTimeLogin ] = React.useState( false );
  const blueCircle = require('../assets/atrium/blue_circle.png');
  
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

  const grantUserRandNumButterflies = async () => {
    //Generate the random butterfly counts
    const b0Random = Math.floor( Math.random() * 5 );
    const b1Random = Math.floor( Math.random() * 5 );
    const b2Random = Math.floor( Math.random() * 5 );
    const b3Random = Math.floor( Math.random() * 5 );
    const b4Random = Math.floor( Math.random() * 5 );
    
    //add existing butterflies to the random 
    const newB0 = b0 + b0Random;
    const newB1 = b1 + b1Random;
    const newB2 = b2 + b2Random;
    const newB3 = b0 + b3Random;
    const newB4 = b4 + b4Random;

    //Set new random butterfly count in async
    await AsyncStorage.setItem( '@user_b0_count' , JSON.stringify( newB0 ) );
    await AsyncStorage.setItem( '@user_b1_count' , JSON.stringify( newB1 ) );
    await AsyncStorage.setItem( '@user_b2_count' , JSON.stringify( newB2 ) );
    await AsyncStorage.setItem( '@user_b3_count' , JSON.stringify( newB3 ) );
    await AsyncStorage.setItem( '@user_b4_count' , JSON.stringify( newB4 ) );
  }

  // Check for users first login 
  const getLoginInfo = async () => {
    const firstTimeLogin = await AsyncStorage.getItem( '@first_time_login' );
    setFirstTimeLogin( firstTimeLogin );
  }
  getLoginInfo();
  console.log( firstTimeLogin );

  //Check for first login ever
  const checkForGrant = async () => {
    if( firstTimeLogin === null ){
      grantUserRandNumButterflies();
      Alert.alert(
        'Congrats',
        'You have been awarded some butterflies for first time login!',
        [
         { text: 'Awesome'}
        ]
      )
    }

    await AsyncStorage.setItem( '@first_time_login' , JSON.stringify( false ) );
  }

  checkForGrant(); 

    return(
      <View style={ style.main }>
          <ImageBackground source={require('../assets/atrium_background.jpg')} style={ style.backgroundImage } resizeMode="cover">
           <Text style={ style.header }>Atrium</Text>
           <View style={ style.atriumContainer }>
             <View style={ style.align }>
               <Image style={ style.butterflies } source={require('../assets/atrium/green_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircle } source={ blueCircle }></Image>
               <Text style={ style.butterflyText }>{ b0 }</Text>
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/red_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircleEnd }  source={ blueCircle }></Image>
               <Text style={ style.butterflyTextEnd }>{ b1 }</Text>
             </View>
             <View style={ style.align }>
               <Image style={ style.butterflies } source={require('../assets/atrium/yellow_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircle }  source={ blueCircle }></Image>
               <Text style={ style.butterflyText }>{ b3 }</Text>
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/purple_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircleEnd }  source={ blueCircle }></Image>
               <Text style={ style.butterflyTextEnd }>{ b4 }</Text>

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

       butterflyTextEnd:{
         fontSize: 30,
         position: 'absolute', 
         fontWeight: 'bold',
         color: 'white',
         right: 0,
         marginTop: 75,
         marginRight: 45,
       },

       butterflyText:{
        position: 'absolute',
        marginLeft: 115,
        marginTop: 75,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
       },

       blueCircle:{
         resizeMode: 'contain',
         height: 50,
         width: 50,
         position: 'absolute',
         marginLeft: 100,
         marginTop: 70,
       },

       blueCircleEnd:{
        resizeMode: 'contain',
        height: 50,
        width: 50,
        position: 'absolute',
        right: 0,
        marginTop: 70,
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