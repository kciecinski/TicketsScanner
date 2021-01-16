import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import StopSign from './StopSign';

const ErrorScreen = () => {
  return (
    <View style={style.errorConteiner}>
      <Text style={style.errorText}>Something went wrong</Text>
      <StopSign />
      <Text style={style.errorText}>An error occured.</Text>
    </View>
  );
};

const style = StyleSheet.create({
  errorConteiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(64),
  },
  errorText: {
    fontSize: 32,
    marginVertical: moderateScale(16),
  },
});

export default ErrorScreen;
