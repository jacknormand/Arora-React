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
            
              <View style={ style.userInfo }>
                <Text style={ style.userText }>Username</Text>
                <Image style={ style.userIcon } source={require('../assets/home/profile_filled_button.png')} resizeMode='contain'/>
              </View>

              <View style={ style.butterflyboxes }>
                <Image style={ style.butterfly } source={require('../assets/loginScreen/orange_butterfly_image.png')} resizeMode='contain'/>
                <View style={ style.boxes }>
                <View style={ style.itemBox }>
                    <Image style={ style.boxIcon } source={require('../assets/half_pollen.png')} resizeMode='contain'/>
                    <Text style={ style.boxText }>Total Pollen Count</Text>
                    <Text style={ style.userPollen }>0</Text>
                </View>
                <TouchableOpacity style={style.itemBox} onPress={() => navigation.navigate('Atrium') }>
                      <Image style={ style.boxIcon } source={require('../assets/jar_button.png')} resizeMode='contain'/>
                      <Text style={ style.boxText }>Atrium - View All Butterfies</Text>
                </TouchableOpacity>
                </View>

              </View>
                <Footer />
            </ImageBackground>
        </View>
    );
};

const style = StyleSheet.create({
    main:{
     flex:1,
    },

    userText:{
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
     },


    userIcon:{
      height: 50,
      width: 50,
    },

     userInfo:{
      position: 'absolute',
      right: 20,
      top: 50,
      color: 'white',
     fontSize: 15,
     fontWeight: 'bold',
     flexDirection: 'row',
     alignItems: 'center',
     },

     butterflyboxes:{
       flex: .87,
       flexDirection: 'column',
       justifyContent: 'center',
       marginTop: 10,
       marginBottom: 10,
     },

     
    boxText:{
      color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    },

    itemBox:{
      height: 80,
      width: "90%",
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 5,
      justifyContent: 'center', 
      marginTop: 10,
    },

    boxes:{
      alignItems: 'center',
    },

    butterfly:{
      height: 250,
      width: 250,
      alignSelf: 'center',
    },
  
     boxIcon:{
      width: 35,
      height: 35,
      resizeMode: 'contain',
      marginLeft: 5,
      position: 'absolute', left: 0,
    },
  
      userPollen:{
       color: 'white',
       fontSize: 20,
       marginRight: 20,
       position: 'absolute', right: 0,
       fontWeight: 'bold',
    },

    image:{
      flex: 1,
    },
});
