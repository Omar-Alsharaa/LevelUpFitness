import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';
import { 
  useFonts,
  Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';
import {
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
} from '@expo-google-fonts/rajdhani';
import LoadingScreen from './src/components/LoadingScreen';

// Import screens
import Dashboard from './src/screens/Dashboard';
import Quests from './src/screens/Quests';
import BossFight from './src/screens/BossFight';
import Leaderboard from './src/screens/Leaderboard';
import Profile from './src/screens/Profile';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <LoadingScreen />
        </SafeAreaView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: true,
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              contentStyle: styles.contentStyle,
            }}
          >
            <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Quests" 
              component={Quests}
              options={{
                title: 'Daily Quests',
              }}
            />
            <Stack.Screen 
              name="BossFight" 
              component={BossFight}
              options={{
                title: 'Boss Fight',
              }}
            />
            <Stack.Screen 
              name="Leaderboard" 
              component={Leaderboard}
              options={{
                title: 'Rankings',
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={Profile}
              options={{
                title: 'Hunter Profile',
              }}
            />
            <Stack.Screen 
              name="Login" 
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTitleStyle: {
    fontFamily: 'Orbitron_700Bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  contentStyle: {
    backgroundColor: theme.colors.background,
  },
}); 