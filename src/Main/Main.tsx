import { Text, View } from 'react-native';
import React from 'react';
import styles from './Main.style';
import { SafeAreaView } from 'react-native';
import MainTabNavigator from '../Navigator/MainTabNavigator';

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainTabNavigator />
    </SafeAreaView>
  );
};

export default Main;
