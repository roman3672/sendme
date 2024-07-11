import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated from 'react-native-reanimated';

const SettingsScreen: React.FC = () => {
    const { theme, toggleTheme, animatedStyles } = useTheme();

    return (
        <Animated.View style={[styles.container, animatedStyles.backgroundColor]}>
            <Animated.Text style={[styles.text, animatedStyles.textColor]}>Dark Mode</Animated.Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default SettingsScreen;
