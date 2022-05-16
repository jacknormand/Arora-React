/*
 TODO:
 - Find icons and implement them
 - Route to the games, find a way to implement the games
 - Optimize the styles for every device
 - Finalize styles
*/
import React from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native';
import Footer from '../components/Footer'

export default function PracticeScreen({ navigation }){
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.image } resizeMode="cover" source={require('../assets/dusk_background.jpg')}>
            <Text style={ style.header }>
              Practice
            </Text>
            <View style={ style.gameCard }>
              <Image></Image>
              <Text style={ style.boxText }>AR Game - Catch Butterfly</Text>
              <Image></Image>
            </View>
            <View style={ style.gameCard }>
              <Image></Image>
              <Text style={style.boxText}>Superfly</Text>
              <Image></Image>
            </View>
           <Footer />
         </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },

    boxText:{
        color: 'white',
        fontSize: 20,
    },

    
    textAlign:{
     flexWrap: 'wrap',
     flexDirection: 'row',
     alignItems: 'flex-start',
    },

    gameCard:{
        height: 80,
        width: 350,
        marginTop: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
        borderRadius: 5,
    },

    image:{
        flex: 1,
        alignItems: 'center',
    },

    header:{
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
        marginTop: 40,
    }
})
