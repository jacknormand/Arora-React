import { StatusBar } from 'expo-status-bar';
import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image, TextInput } from 'react-native';
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
    paddingTop: 50
  },
  loginView: {
    backgroundColor: 'rgba(163, 163, 163, 0.6)',
    flex: 1,
    marginBottom: 25,
    marginHorizontal: 20,
    marginTop: 500,
    borderRadius: 10
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
    
  },
  

});
