import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import WellnessScreen from './screens/WellnessScreen';

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
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
