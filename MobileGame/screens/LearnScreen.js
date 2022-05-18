/*
 TODO:
 - Find and implement icons 
 - Optimize the styles for every device
 - Finalize Styles
 - Route to Mindfulness activities
 - Fix footer, Routing works but fix visuals
*/
import React from 'react';
import { View , Text , Image , ImageBackground , TouchableOpacity , StyleSheet } from 'react-native';
import Footer from '../components/Footer';

export default function LearnScreen({ navigation }){
  return(
    <View style={ style.main }>
      <ImageBackground style={ style.backgroundImage} resizeMode="cover" source={ require('../assets/dusk_background.jpg')}>
       <Text style={ style.header }>Learn Mindfulness</Text>
       <TouchableOpacity style={style.box} 
              onPress={() => navigation.navigate('Learn')}>
                <Image
              source = {require('../assets/learnScreen/breath_button.png')}
              resizeMode="center"
              style = {style.icons}
              />
                <Text style={style.boxText}>Mindfulness Breathing</Text>

                <Image
              style = {style.iconsArrow}
              source = {require('../assets/learnScreen/ic_action_name.png')}
              resizeMode="center"
              />
       </TouchableOpacity>
       <TouchableOpacity style={style.box}
              onPress={() => navigation.navigate('Learn')}>
                <Image
              source = {require('../assets/learnScreen/mindfullness_meditation_icon.png')}
              resizeMode="center"
              style = {style.icons}
              />
                <Text style={style.boxText}>Mindfulness Meditation</Text>

                <Image
              style = {style.iconsArrow}
              source = {require('../assets/learnScreen/ic_action_name.png')}
              resizeMode="center"
              />
       </TouchableOpacity>
       <TouchableOpacity style={style.box} 
              onPress={() => navigation.navigate('Learn')}>
                <Image
              source = {require('../assets/learnScreen/location_button.png')}
              resizeMode="center"
              style = {style.icons}
              />
                <Text style={style.boxText}>Mindfulness Walking</Text>

                <Image
              style = {style.iconsArrow}
              source = {require('../assets/learnScreen/ic_action_name.png')}
              resizeMode="center"
              />
       </TouchableOpacity>
       < Footer />
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  main:{
    flex: 1,
  },

  box:{
    height: 80,
    width: "90%",
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    justifyContent: 'center',
  },

  boxText:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  icons:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 5,
    position: 'absolute', left: 0,
  },

  iconsArrow:{
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 5,
    position: 'absolute', right: 0,
  },

  backgroundImage:{
    flex:1,
    alignItems: 'center',
  },

  header:{
    fontSize: 30,
    color: 'white',
    marginTop: 70,
    textAlign: 'center',
    fontWeight: 'bold',
  },

})
