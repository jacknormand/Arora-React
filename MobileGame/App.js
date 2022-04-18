import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
//View
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/dusk_background.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.view2}>
          <Image
          source = {require('./assets/blue_butterfly_image.png')}
          resizeMode="center"
          style = {styles.butterfly}
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
  view2: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
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

});
