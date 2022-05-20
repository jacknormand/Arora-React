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
import Walking from './screens/MindfullWalking';
import Breathing from './screens/MindfullBreathing';
import Meditation from './screens/Meditation';

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
          <Stack.Screen name="Walking" component={ Walking } />
          <Stack.Screen name="Breathing" component={ Breathing } />
          <Stack.Screen name="Meditation" component={ Meditation } />
          <Stack.Screen name="Splash" component={ SplashScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    </ImageBackground>
    </PaperProvider>

    </View>
    
  );
}
