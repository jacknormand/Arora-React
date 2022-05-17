/*
  TODO:
  - Find the rest of the icons
  - Make the styles universal between platforms and different screen sizes.( find a way to calculate device mesurments)
  - Create routes to other app screens
  - Add functionality such as icon animations and User data( pollen count and username and so on.)
  - Finalize the styles to be used  
*/
import React from "react";
import { TouchableOpacity , Text , ImageBackground , View , StyleSheet , Image } from "react-native"
import Footer from '../components/Footer'


export default function HomeScreen( { navigation }){
    return(
        <View style={ style.main }>
            <ImageBackground source={require('../assets/dusk_background.jpg')} resizeMode="cover" style={ style.image }>
                <Image style={ style.userIcon } source={require('../assets/profile_button_unfilled.png')} resizeMode='contain'/>
                <Image style={ style.butterfly } source={require('../assets/blue_butterfly_image.png')}/>
                <View style={ style.itemBox }>
                  <View style={ style.textAlign } >
                    <Image style={ style.boxIcon } source={require('../assets/half_pollen.png')} resizeMode='contain'/>
                    <Text style={ style.boxText }>Total Pollen Count</Text>
                    <Text style={ style.userPollen }>0</Text>
                   </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Atrium') }>
                  <View style={ style.itemBox }>
                     <View style={ style.textAlign }>
                      <Image style={ style.boxIcon } source={require('../assets/jar_button.png')} resizeMode='contain'/>
                      <Text style={ style.boxText }>Attrium - View All Butterfies</Text>
                     </View>
                  </View>
                </TouchableOpacity>
                <Footer />
            </ImageBackground>
        </View>
    );
};

const style = StyleSheet.create({
    main:{
     flex:1,
    },

    boxText:{
      color: 'white',
      fontSize: 20,
      paddingLeft: 10,
      marginTop: 25,
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
      marginLeft: 250,
      height: 100,
      width: 100,
    },
  
     boxIcon:{
      height: 50,
      width: 50,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 10,
      paddingRight: 10,
    },
  
      userPollen:{
       color: 'white',
       fontSize: 20,
       paddingLeft: 50,
       marginTop: 25,
    },

    image:{
      flex: 1,
      paddingTop: 50,
      alignItems: 'center'
    },

    textAlign:{
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
});
