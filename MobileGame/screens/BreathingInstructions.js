import React from 'react'
import { View , StyleSheet , Text , ImageBackground , Image , TouchableOpacity } from 'react-native'

/*
 JUST A BASE TEMPLATE
 TODO: FINISH STYLES AND ANIMATION, NOT RIGHT IMAGE BUT DONT WANT TO LOOK RIGHT NOW
*/

export default function BreathingInstructions( { navigation } ){

    return(
        <View style={ style.main }>
            <ImageBackground style={ style.background } source={require('../assets/dusk_background.jpg')} resizeMode='cover'>
              <Text style={ style.header }>Mindfulness Breathing</Text>
              <Image style={ style.image } source={require('../assets/learnScreen/breath_button.png')} resizeMode="contain"></Image>
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
    header:{
        fontSize: 30,
        color: 'white',
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image:{
        marginTop: 10,
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    textbox:{
        height: '45%',
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginTop: 10,
        borderRadius: 15,
        alignSelf: 'center'
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
        height: 100,
        width: 100,
        marginTop: 10,
    }
})