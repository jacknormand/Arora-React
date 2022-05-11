/*
  TODO:
  - Find the rest of the icons
  - Make the styles universal between platforms and different screen sizes.( find a way to calculate device mesurments)
  - Create routes to other app screens
  - Add functionality such as icon animations and User data( pollen count and username and so on.)
  - Finalize the styles to be used  
*/
import React from "react";
import { TouchableOpacity , Text ,ImageBackground , View , StyleSheet , Image } from "react-native"

export default function HomeScreen( { navigation }){
    return(
        <View style={ style.main }>
            <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ style.image }>
                <Image style={ style.userIcon } source={require('../assets/user-placeholder-icon.png')}/>
                <Image style={ style.butterfly } source={require('../assets/blue_butterfly_image.png')}/>
                <View style={ style.itemBox }>
                    <Image style={ style.boxIcon }/>
                    <Text style={ style.text }>Total Pollen Count</Text>
                </View>
                <View style={ style.itemBox }>
                    <Image style={ style.boxIcon }/>
                    <Text style={ style.text }>Attrium - View All Butterfies</Text>
                </View>
                <View style={ style.footer }>
                  <View>
                    <Image></Image>
                    <Image></Image>
                    <Image style={ style.learnIcon } source={require('../assets/learnIcon.png')}></Image>
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
            </ImageBackground>
        </View>
    );
};

const style = StyleSheet.create({
    main:{
     flex:1,
    },

    text:{
      color: 'white',
      fontSize: 20,
      paddingLeft: 10,
    },

    butterfly:{
     marginTop: 50,
    },

    itemBox:{
     backgroundColor: 'rgba(0, 0, 0, 0.14)',
     marginTop: 30,
     height: 75,
     width: 335,
     borderRadius: 5,
    },

    butterfly:{
      marginLeft: 50,
      marginRight: 50,
      height: 250,
      width: 300,
    },

    userIcon:{
      marginLeft: 290,
      height: 100,
      width: 100,
    },

    boxIcon:{
     paddingTop: 5,
     paddingBottom: 5,
     paddingLeft: 10,
     paddingRight: 10,
    },

    image:{
      flex: 1,
      paddingTop: 50,
      alignItems: 'center'
    },

    footer:{
      backgroundColor: 'rgba(0, 0, 0, 0.14)',
      marginTop: 200,
      width:410,
      height:90,
    },

    textAlign:{
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    learnIcon:{
      marginLeft: 350,
      marginTop: 10,
      height: 40,
      width: 32,
      borderColor: 'white',
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
     marginBottom: 10
    }
});
