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

export default function LearnScreen({ navigation }){
  return(
    <View style={ style.main }>
      <ImageBackground style={ style.backgroundImage} resizeMode="cover" source={ require('../assets/dusk_background.jpg')}>
       <Text style={ style.header }>Learn Mindfulness</Text>
       <View style={ style.box }>
         <Image></Image>
         <Text style={ style.boxText }>Mindfulness Breathing</Text>
         <Image></Image>
       </View>
       <View style={ style.box }>
         <Image></Image>
         <Text style={ style.boxText }>Mindfulness Meditation</Text>
         <Image></Image>
       </View>
       <View style={ style.box }>
         <Image></Image>
         <Text style={ style.boxText }>Mindfulness Walking</Text>
         <Image></Image>
       </View>
       <View style={ style.footer }>
          <View>
            <Image></Image>
            <Image></Image>
            <Image></Image>
          </View>
            <View style={ style.textAlign }>
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

  box:{
    height: 80,
    width: 350,
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    borderRadius: 5,
  },

  footer:{
    width: 450,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    marginTop: 375,
  },

  footerText:{
    color: 'white',
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

  learnText:{
    marginLeft: 345,
    color: 'white',
  },

  textAlign:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  boxText:{
    color: 'white',
    fontSize: 20,
  },

  backgroundImage:{
    flex:1,
    alignItems: 'center',
  },

  header:{
    fontSize: 50,
    color: 'white',
    marginTop: 40,
  },

})
