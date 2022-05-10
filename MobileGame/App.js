import { StatusBar } from 'expo-status-bar';
import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
//View
export default function App() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/dusk_background.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.butterflyView}>
          <Image
          source = {require('./assets/blue_butterfly_image.png')}
          resizeMode="center"
          style = {styles.butterfly}
          />
          <Text style={styles.title}>Arora</Text>
        </View>
        <View style={styles.loginView}>
          <TextInput 
            style={styles.textIn}
            onChangeText={onChangeNumber}
            value={number}
            placeholder= "Username"
          />
          <TextInput 
            style={styles.textIn}
            placeholder= "Password"
          />
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      
    </View>
    
  );
}
//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  butterflyView: {
    flex: 1,
    alignItems: 'center',
  },
  loginView: {
    backgroundColor: 'rgba(163, 163, 163, 0.8)',
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  butterfly: {
    width: 250,
    height: 250,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  textIn: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    backgroundColor: 'rgba(140, 200, 250, 0.3)',
    marginHorizontal: 30,
  },

});
