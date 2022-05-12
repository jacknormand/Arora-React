/*
 TODO:
 - Find icons and implement them
 - Route to the games, find a way to implement the games
 - Optimize the styles for every device
 - Finalize styles
*/
import React from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native';

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
            <View style={ style.footer }>
               <View>
                 <Image></Image>
                 <Image></Image>
                 <Image></Image>
               </View>
               <View style={ style.textAlign}>
                 <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                   <Text style={ style.profileText }>Profile</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Practice')}>
                   <Text style={ style.practiceText }>Practice</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
                   <Text style={ style.learnText }>Learn</Text>
                 </TouchableOpacity>
               </View>
            </View>
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

    footer:{
        width: 450,
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
        marginTop: 475,
    },

    profileText:{
     marginLeft: 15,
     marginBottom: 5,
     color: 'white',
    },

    practiceText:{
        marginLeft: 125,
        marginBottom: 5,
        color: 'white',
    },

    footerText:{
        color: 'white',
    },

    learnText:{
     marginLeft: 345,
     color: 'white',
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
