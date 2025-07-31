import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootNavigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});