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
                      <Image style={ style.icon } source={require('../assets/footer/profile_button_unfilled.png')}></Image>
                      <Text style={style.iconText}>Profile</Text>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={() => navigation.navigate('Practice')}>
                      <Image style={ style.icon } source={require('../assets/footer/butterfly_logo.png')}></Image>
                      <Text style={style.iconText}>Practice</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
                      <Image style={ style.icon } source={require('../assets/footer/learnIcon.png')}></Image>
                      <Text style={style.iconText}>Learn</Text>
                     </TouchableOpacity>
                    </View>
                  </View>
                  <View style={ style.textAlign }>
                  </View>
            </View>
    );
}
const style = StyleSheet.create({
   footer:{
     flex: 1,
     backgroundColor: 'rgba(0, 0, 0, .3)',
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     height: '13%',
  },

  textAlign:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  
  icon:{
      height: 50,
      width: 50,
      resizeMode: 'contain',
      position: 'relative',
      marginTop: 5,
  },

  iconText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: "bold",
  },


})