import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';
import LoadingBall from './LoadingBall';

const LoadingScreen = () => {
  const AnimatedLoadingBall = Animated.createAnimatedComponent(LoadingBall);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  const stylez = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotateZ: `${rotation.value}deg` },
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(withSpring(360), 100, true);
    translateY.value = withRepeat(withSpring(-20), 100, true);
  }, [rotation.value, translateY.value]);

  return (
    <View testID="loadingBall" style={style.loadingConteiner}>
      <AnimatedLoadingBall style={stylez} />
      <Text style={style.loadingText}>Loading</Text>
    </View>
  );
};

const style = StyleSheet.create({
  loadingConteiner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: moderateScale(64),
  },
  loadingText: {
    fontSize: 32,
    marginTop: moderateScale(16),
  },
});

export default LoadingScreen;
