import React from 'react'
import { View , StyleSheet , Text , ImageBackground , Image , TouchableOpacity } from 'react-native'

/*
 JUST A BASE TEMPLATE
 TODO: FINISH STYLES AND ANIMATION, NOT RIGHT IMAGE BUT DONT WANT TO LOOK RIGHT NOW
 FIND PLAY BUTTON 
*/

export default function BreathingInstructions( { navigation } ){

    return(
        <View style={ style.main }>
            <ImageBackground style={ style.background } source={require('../assets/dusk_background.jpg')} resizeMode='cover'>
              <Text style={ style.header }>Mindfulness Breathing</Text>
              <Image style={ style.image } source={require('../assets/learnScreen/breath_button.png')} resizeMode="contain"></Image>
              <View style={ style.textbox }>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Breathing")}>
                  <Text>GO TO GAME</Text>
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
        marginTop: 70,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image:{
        marginTop: 20,
        marginBottom: 20,
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    textbox:{
        height: '50%',
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        alignSelf: 'center'
    }
})