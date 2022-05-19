import React from 'react';
import { View, ImageBackground } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import WellnessScreen from './screens/WellnessScreen';
import HomeScreen from './screens/HomeScreen';
import PracticeScreen from './screens/PracticeScreen';
import LearnScreen from './screens/LearnScreen';
import AtriumScreen from './screens/AtriumScreen';
import SplashScreen from './screens/SplashScreen';
import { initializeApp } from 'firebase/app';

// init firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCvs7JxS3eYd48uwsGnJKzvHmhJwgpNF0s',
  authDomain: 'arora-react-af141.firebaseapp.com',
  databaseURL: 'https://arora-react-af141-default-rtdb.firebaseio.com',
  projectId: 'arora-react-af141',
  storageBucket: 'arora-react-af141.appspot.com',
  messagingSenderId: '1044577763825',
  appId: '1:1044577763825:web:8a91d4e50c730403cd0450',
  measurementId: 'G-Y0JV2W2FQQ',
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <View style={{ flex: 1,}}>
    <PaperProvider>
    <ImageBackground source={require('./assets/dusk_background.jpg')} resizeMode="cover" style={ {flex: 1,} }>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false, 
          gestureEnabled: true,
          /*animation: 'none',*/
        }} 
        mode="modal"
        initialRouteName="Splash">
          <Stack.Screen options={{gestureEnabled: false}} name="Login" component={LoginScreen} />
          <Stack.Screen name="Wellness" component={WellnessScreen} />
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen options={{animation: 'none'}} name="Practice" component={ PracticeScreen } />
          <Stack.Screen options={{animation: 'none'}} name="Learn" component={ LearnScreen } />
          <Stack.Screen name="Atrium" component={ AtriumScreen } />
          <Stack.Screen name="Splash" component={ SplashScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    </ImageBackground>
    </PaperProvider>

    </View>
    
  );
}
