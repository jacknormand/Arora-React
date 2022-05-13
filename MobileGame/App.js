import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import WellnessScreen from './screens/WellnessScreen';
import HomeScreen from './screens/HomeScreen';
import PracticeScreen from './screens/PracticeScreen';
import LearnScreen from './screens/LearnScreen';
import AtriumScreen from './screens/AtriumScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Wellness" component={WellnessScreen} />
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="Practice" component={ PracticeScreen } />
          <Stack.Screen name="Learn" component={ LearnScreen } />
          <Stack.Screen name="Atrium" component={ AtriumScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
