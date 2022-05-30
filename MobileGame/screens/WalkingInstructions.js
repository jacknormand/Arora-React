import React from 'react'
import { View , ImageBackground , Text , StyleSheet , Image , TouchableOpacity } from 'react-native'

/*
  JUST A TEMPLATE
  TODO: FIND PLAY BUTTON AND ANIMATIONS, FINALIZE STYLES FOR ALL DEVICES
*/

export default function WalkingInstructions( { navigation } ){
    return(
        <View style={ style.main }>
            <ImageBackground style={ style.background } source={require("../assets/dusk_background.jpg")} resizeMode="cover">
                 <Text style={ style.header }>Mindfulness Walking</Text>
                 <Image></Image>
                 <Text style={ style.infotext }>Take a walk to clear your mind and regain your calm mind.</Text>
                 <Text style={ style.infotext }>Walk and listen with headphones to the audio</Text>
                 <TouchableOpacity onPress={() => navigation.navigate('Walking')}>
                     <Image source={ require('../assets/play_button.png') }></Image>
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
    infotext:{
        color: 'white',
        fontSize: 20,
    }
})