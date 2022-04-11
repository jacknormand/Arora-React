import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const image = { uri: "/Users/hoonkwon/Desktop/GithubProjects/Mental-Health-Mobile-Games/MobileGame/assets/dusk_background.jpg" };

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      </ImageBackground>
    </View>
  );
}
//Hello
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },

});
