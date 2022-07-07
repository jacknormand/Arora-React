import React , { useEffect, useState } from 'react'
import { View , ImageBackground , StyleSheet , Text , Image , Alert , TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper'
import { Overlay } from 'react-native-elements';

export default function AtriumScreen({navigation}){
  //Set the user butterfly counts for all atrium
  const [ b0 , setB0 ] = React.useState( 0 );
  const [ b1 , setB1 ] = React.useState( 0 );
  const [ b2 , setB2 ] = React.useState( 0 );
  const [ b3 , setB3 ] = React.useState( 0 );
  const [ b4 , setB4 ] = React.useState( 0 );
  const [ overlayVisable , setOverlayVisable ] = React.useState( false );
  const [ overlayText , setOverlayText ] = React.useState('');
  const [ overlayTitle , setOverlayTitle ] = React.useState('');
  const blueCircle = require('../assets/atrium/blue_circle.png');
  
  const getUserButterflies = async () => {
    //gather the user butterfly amount from storage
    AsyncStorage.getItem( '@user_b0_count' ).then( value => setB0( value ) );
    AsyncStorage.getItem( '@user_b1_count' ).then( value => setB1( value ) );
    AsyncStorage.getItem( '@user_b2_count' ).then( value => setB2( value ) );
    AsyncStorage.getItem( '@user_b3_count' ).then( value => setB3( value ) );
    AsyncStorage.getItem( '@user_b4_count' ).then( value => setB4( value ) );
  }

  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
        getUserButterflies();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount( No render on navigation )
    return unsubscribe;
    }, [ navigation ] );

  const setOverlayFalse = () => {
    setOverlayVisable( false );
  }
  
  const setOverlayTrue = () => {
    setOverlayVisable( true );
  }

  const displayGreenButterfly = () => {
    setOverlayTitle( "Green Butterfly" );
    setOverlayText( "You clicked on the green butterfly!" );
    setOverlayTrue();
  }

  const displayRedButterfly = () => {
    setOverlayTitle( "Red Butterfly" );
    setOverlayText( "You pressed the red butterfly" );
    setOverlayTrue();
  }

  const displayYellowButterfly = () => {
    setOverlayTitle( "Yellow Butterfly" );
    setOverlayText( "You pressed the yellow butterfly" );
    setOverlayTrue();
  }

  const displayPurpleButterfly = () => {
    setOverlayTitle( "Purple Butterfly" );
    setOverlayText( "You pressed the purple butterfly" );
    setOverlayTrue();
  }

    return(
      <View style={ style.main }>
          <ImageBackground source={require('../assets/atrium_background.jpg')} style={ style.backgroundImage } resizeMode="cover">
           <Text style={ style.header }>Atrium</Text>
           <View style={ style.atriumContainer }>
           <Overlay isVisible={ overlayVisable } overlayStyle={{width: '90%',height: '90%', backgroundColor:'rgba(0, 245, 196, .7)'}}>
            <Text style={ style.overlayTitle }>{ overlayTitle }</Text>
            <Text>{ overlayText }</Text>
            <TouchableOpacity style={ style.button } onPress={ setOverlayFalse }>
              <Text style={ style.buttonText }>Close</Text>
            </TouchableOpacity>
           </Overlay>
             <View style={ style.align }>
              <TouchableOpacity activeOpacity={1} onPress={ displayGreenButterfly }>
               <Image style={ style.butterflies } source={require('../assets/atrium/green_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircle } source={ blueCircle }></Image>
               <Text style={ style.butterflyText }>{ b0 }</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={ displayRedButterfly }>
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/red_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircleEnd }  source={ blueCircle }></Image>
               <Text style={ style.butterflyTextEnd }>{ b1 }</Text>
              </TouchableOpacity>
             </View>
             <View style={ style.align }>
              <TouchableOpacity activeOpacity={1} onPress={ displayYellowButterfly } >
               <Image style={ style.butterflies } source={require('../assets/atrium/yellow_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircle }  source={ blueCircle }></Image>
               <Text style={ style.butterflyText }>{ b2 }</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={ displayPurpleButterfly }>
               <Image style={ style.butterflyEnd } source={require('../assets/atrium/purple_butterfly_image.png')} resizeMode="contain" />
               <Image style={ style.blueCircleEnd }  source={ blueCircle }></Image>
               <Text style={ style.butterflyTextEnd }>{ b3 }</Text>
              </TouchableOpacity>

             </View>
               <Image></Image>
            <Button icon="arrow-left" mode="contained" style={style.backButton} 
                    onPress={() => navigation.goBack()}
                    color='rgba(0, 0, 0, 0.0)'>Back
            </Button>
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
        position: 'relative',
        right: 0,
        height: 120,
        width: 120,
        marginRight: 30,
       },

       overlayTitle:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 30
       },

       button:{
        height: 75,
        width: 200,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        bottom: 0,
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

       buttonText:{
        color: 'white',
        alignSelf: 'center',
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

       backButton:{
        height: 50,
        width: 100,
        position: 'absolute', left: 5, bottom: 0,
        borderRadius: 15,
        },
})