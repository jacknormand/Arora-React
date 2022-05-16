import React from 'react';
import { View, ImageBackground } from 'react-native'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import WellnessScreen from './screens/WellnessScreen';
import HomeScreen from './screens/HomeScreen';
import PracticeScreen from './screens/PracticeScreen';
import LearnScreen from './screens/LearnScreen';
import AtriumScreen from './screens/AtriumScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={{ flex: 1,}}>
    <PaperProvider>
    <ImageBackground source={require('./assets/dusk_background.jpg')} resizeMode="cover" style={ {flex: 1,} }>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
        screenOptions={{
          headerShown: false, 
          gestureEnabled: true,
          animation: 'none',
        }} 
        mode="modal"
        initialRouteName="Splash">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Wellness" component={WellnessScreen} />
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="Practice" component={ PracticeScreen } />
          <Stack.Screen name="Learn" component={ LearnScreen } />
          <Stack.Screen name="Atrium" component={ AtriumScreen } />
          <Stack.Screen name="Splash" component={ SplashScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    </ImageBackground>
    </PaperProvider>

    </View>
    
  );
}
