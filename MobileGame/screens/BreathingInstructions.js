
import React from 'react'
import { View , StyleSheet , Text , ImageBackground , Image , TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';

/*
 JUST A BASE TEMPLATE
 TODO: FINISH STYLES AND ANIMATION, NOT RIGHT IMAGE BUT DONT WANT TO LOOK RIGHT NOW
*/

export default function BreathingInstructions( { navigation } ){

    return(
        <View style={ style.main }>
            <ImageBackground style={ style.background } source={require('../assets/dusk_background.jpg')} resizeMode='cover'>
              <Text style={ style.header }>Mindfulness Breathing</Text>
              <View style={style.icons}>
              <Image style={ style.greenIconTwo } source={ require("../assets/breathing/breathing_button.png") } />
               <Image style={ style.greenIcon } source={ require("../assets/breathing/breathing_button.png") } ></Image>
              </View>
              <View style={ style.textbox }>
                  <Text style={ style.title }>INSTRUCTIONS</Text>
                  <Text style={ style.boxText }>Focus on your breath to regain your calm</Text>
                  <Text style={ style.boxText }>Lets exercise 5 breaths</Text>
                  <Text style={ style.boxText }>Press the button below to start</Text>
                  <Text style={ style.boxText }>Hold the button when you breath in Release the button when you breath out</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Breathing")}>
                <Image style={ style.play } source={ require('../assets/play_button.png') }></Image>
              </TouchableOpacity>


              <Button icon="arrow-left" mode="contained" style={style.backButton} 
          onPress={() => navigation.goBack()}
          color='rgba(0, 0, 0, 0.3)'>Back
          </Button>
            </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
    background:{
        flex: 1,
    },

    icons:{
        justifyContent: 'center',
          },

    greenIconTwo:{
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf:'center',
    position: 'absolute',
    tintColor: 'rgba(255, 255, 255, 0.3)',
    
        },

    greenIcon:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',

        },

    header:{
        fontSize: 30,
        color: 'white',
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backDrop:{
     height: 500,
     width: 500,
     position: 'absolute',
     alignSelf: 'center',
    },
    image:{
        marginTop: 10,
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    textbox:{
        height: '45%',
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title:{
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
    },
    boxText:{
        fontSize: 15,
        color: 'white',
        justifyContent: 'space-evenly',
        marginTop: 30,
        marginLeft: 10,
    },
    play:{
        alignSelf: 'center',
        height: 75,
        width: 75,
        marginTop: 10,
    },

    backButton:{
        height: 50,
        width: 100,
        justifyContent: 'center',
        position: 'absolute', left: "5%", bottom: 50,
        borderRadius: 15,
    }
})