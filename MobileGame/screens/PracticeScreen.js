/*
 TODO:
 - Find icons and implement them
 - Route to the games, find a way to implement the games
 - Optimize the styles for every device
 - Finalize styles
*/
import React from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity , PermissionsAndroid , Platform , Alert } from 'react-native';
import Footer from '../components/Footer'

export default function PracticeScreen({ navigation }){
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.image } resizeMode="cover" source={require('../assets/dusk_background.jpg')}>
            <Text style={ style.header }>
              Practice
            </Text>
            <TouchableOpacity style={ style.gameCard } onPress={() => Platform.OS != 'ios' ? cameraAcess() : Alert.alert("Alert" , "Function not allowed for ios yet " , [{text: "Ok" , onPress: () => navigation.navigate("Practice")}])}>
              <Image style={ style.boxIcon } source={require('../assets/catch_butterfly.png')} resizeMode="center"></Image>
              <Text style={ style.boxText }>AR Game - Catch {'\n'}Butterfly</Text>
              <Image style={ style.arrow } source={require('../assets/learnScreen/ic_action_name.png')} resizeMode="center"></Image>
            </TouchableOpacity>
            <TouchableOpacity style={ style.gameCard }>
              <Image style={ style.boxIconTwo } resizeMode="center" source={require('../assets/superfly.png')}></Image>
              <Text style={style.boxText}>Superfly</Text>
              <Image style={ style.arrow } source={require('../assets/learnScreen/ic_action_name.png')} resizeMode="center"></Image>
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
        width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 5,
    position: 'absolute', right: 0,
    },

    boxText:{
        color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    },

 
     boxIcon:{
        width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute', left: 20,
    },

    boxIconTwo:{
        width: 75,
    height: 75,
    resizeMode: 'contain',
    position: 'absolute', left: 20,
    },

    gameCard:{
        height: 80,
    width: "90%",
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
        fontSize: 30,
    color: 'white',
    marginTop: 70,
    textAlign: 'center',
    fontWeight: 'bold',
    }
})
