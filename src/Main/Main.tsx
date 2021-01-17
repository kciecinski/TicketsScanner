import React, { useEffect } from 'react';
import MainTabNavigator from '../Navigator/MainTabNavigator';
import SplashScreen from 'react-native-splash-screen';

const Main = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <>
      <MainTabNavigator />
    </>
  );
};

export default Main;
