import React from 'react';
import { View , Text , ImageBackground , StyleSheet , Image , TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
export default function Meditation({ navigation }){
    return(
        <View style={ style.main }>
         <ImageBackground style={ style.image } resizeMode="cover" source={require('../assets/dusk_background.jpg')}>
            <Text style={ style.header }>
              Mindfulness Walking
            </Text>

            <View style={style.icons}>
            <Image style={ style.greenIcon } source={require('../assets/meditation/mindfulness_meditation_alpha.png')}/>
            <Image style={ style.greenIconTwo } source={require('../assets/meditation/mindfulness_meditation_button.png')}/>
            </View>

            <View style={ style.gameCard }>
              <Text style={style.boxText}>Take a walk to clear your mind{'\n'} and regain your calm mind</Text>


              <Text style={style.boxText}>Walk and listen with headphones{'\n'} to the audio</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Walking')}>
        <Image style={ style.icon } source={require('../assets/play_button.png')}></Image>
        </TouchableOpacity>
            </View>

        
        
          <Button icon="arrow-left" mode="contained" style={style.backButton} 
          onPress={() => navigation.goBack()}
          color='rgba(0, 0, 0, 0.3)'>Back</Button>
         </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    main:{
    flex: 1,
    },

    image:{
        flex: 1,
      },

    backButton:{
      height: 50,
      width: 100,
      justifyContent: 'center',
      position: 'absolute', left: "5%", bottom: 50,
      borderRadius: 15,
      },


    boxText:{
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 15,
    textAlign: 'center',
    },

    gameCard:{
    height: "40%",
    width: "90%",
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    },

    icons:{
        marginTop: 20,
        justifyContent: 'center',
          },

    icon:{
    marginTop: 20,
    alignSelf:'center',
    width: 70,
    height: 70,
        },

    greenIcon:{
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'rgba(255, 255, 255, 0.3)',
      },

    greenIconTwo:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    position:'absolute',

        },

    header:{
    fontSize: 30,
    color: 'white',
    marginTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    },
})
