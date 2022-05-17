import React from 'react';
import { TouchableOpacity , Text , Image , StyleSheet , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

export default function Footer(){
    const navigation = useNavigation();
    return(
            <View style={ style.footer }>
                  <View>
                    <View style={ style.textAlign }>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                      <Image style={ style.profileIcon } source={require('../assets/profile_filled_button.png')} resizeMode='contain'></Image>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('Practice')}>
                      <Image style={ style.practiceIcon } source={require('../assets/mindfullness_meditation_icon.png')} resizeMode='contain'></Image>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
                      <Image style={ style.learnIcon } source={require('../assets/learnIcon.png')} resizeMode='contain'></Image>
                     </TouchableOpacity>
                    </View>
                  </View>
                  <View style={ style.textAlign }>
                      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                         <Text style={ style.profileText }>Profile</Text>
                      </TouchableOpacity>
                      < TouchableOpacity onPress={() => navigation.navigate('Practice')}>
                         <Text style={ style.practiceText }>Practice</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
                         <Text style={ style.learnText }>Learn</Text>
                      </TouchableOpacity>
                  </View>
            </View>
    );
}
const style = StyleSheet.create({
   footer:{
     backgroundColor: 'rgba(0, 0, 0, .4)',
     position: 'absolute',
     flex: 0.1,
     left: 0,
     right: 0,
     bottom: 0,
     height: 80,
     alignItems: 'center'
  },

  textAlign:{
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  
  learnIcon:{
      height: 50,
      width: 50,
  },

  profileText:{
    color: 'white',
  },

  profileIcon:{
      height: 50,
      width: 50,
  },

  practiceText:{
    color: 'white',
    marginLeft: 85,
    marginRight: 85,
  },

  practiceIcon:{
      height: 50,
      width: 50,
      marginLeft: 80,
      marginRight: 80,
  },

  learnText:{
   color: 'white',
  },
})