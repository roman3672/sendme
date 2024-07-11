import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated from 'react-native-reanimated';

const HomeScreen: React.FC = () => {
  const { animatedStyles } = useTheme();

  return (
    <Animated.View style={[styles.container, animatedStyles.backgroundColor]}>
      <Animated.Text style={[styles.text, animatedStyles.textColor]}>Home Screen</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
