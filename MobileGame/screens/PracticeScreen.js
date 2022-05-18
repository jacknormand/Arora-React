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
            <TouchableOpacity style={ style.gameCard }>
             <View style={ style.align }>
              <Image style={ style.boxIcon } source={require('../assets/catch_butterfly.png')} resizeMode="contain"></Image>
              <Text style={ style.boxText }>AR Game - Catch Butterfly</Text>
              <Image style={ style.arrow } source={require('../assets/arrowIcon.png')} resizeMode="contain"></Image>
             </View>
            </TouchableOpacity>
            <TouchableOpacity style={ style.gameCard }>
             <View style={ style.align }>
              <Image style={ style.boxIcon } resizeMode="contain" source={require('../assets/superfly.png')}></Image>
              <Text style={style.boxText}>Superfly</Text>
              <Image style={ style.arrow } source={require('../assets/arrowIcon.png')} resizeMode="contain"></Image>
             </View>
            </TouchableOpacity>
           <Footer />
         </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    main:{
        flex: 1,
    },
 
    arrow:{
        position: 'absolute',
        right: 0,
        marginTop: 10,
    },

    boxText:{
        color: 'white',
        fontSize: 15,
        marginTop: 15,
    },

    
    align:{
     flexWrap: 'wrap',
     flexDirection: 'row',
    },
 
     boxIcon:{
        height: 60,
        width: 60,
        marginLeft: 10,
        marginRight: 10,
    },

    gameCard:{
        height: '10%',
        width: '90%',
        marginTop: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        justifyContent: 'center',
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
