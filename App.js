import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MatchSetupScreen from './src/screens/MatchSetupScreen';
import GameScoreScreen from './src/screens/GameScoreScreen';
import WinnerScreen from './src/screens/WinnerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="MatchSetup"
          screenOptions={{
            headerStyle: { backgroundColor: '#0d1b2a' },
            headerTintColor: '#f4d35e',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#0d1b2a' },
          }}
        >
          <Stack.Screen
            name="MatchSetup"
            component={MatchSetupScreen}
            options={{ title: 'Retro NBA Match Setup' }}
          />
          <Stack.Screen
            name="GameScore"
            component={GameScoreScreen}
            options={{ title: 'Arcade Scoreboard' }}
          />
          <Stack.Screen
            name="Winner"
            component={WinnerScreen}
            options={{ title: 'Game Results' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
