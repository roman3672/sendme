import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as _useColorScheme } from 'react-native';
import { Colors, ThemeType } from '@/constants/Colors';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    animatedStyles: {
        backgroundColor: ReturnType<typeof useAnimatedStyle>;
        textColor: ReturnType<typeof useAnimatedStyle>;
    };
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
    animatedStyles: {
        backgroundColor: {},
        textColor: {},
    },
});

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const systemColorScheme = _useColorScheme();
    const [theme, setTheme] = useState<ThemeType>((systemColorScheme as ThemeType) || 'light');
    const backgroundColor = useSharedValue(Colors[theme].background);
    const textColor = useSharedValue(Colors[theme].text);

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = (await AsyncStorage.getItem('theme')) as ThemeType | null;
            if (storedTheme) {
                setTheme(storedTheme);
                backgroundColor.value = Colors[storedTheme].background;
                textColor.value = Colors[storedTheme].text;
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme: ThemeType = prevTheme === 'light' ? 'dark' : 'light';
            AsyncStorage.setItem('theme', newTheme);
            backgroundColor.value = withTiming(Colors[newTheme].background, { duration: 300 });
            textColor.value = withTiming(Colors[newTheme].text, { duration: 300 });
            return newTheme;
        });
    };

    const animatedStyles = {
        backgroundColor: useAnimatedStyle(() => {
            return { backgroundColor: backgroundColor.value };
        }),
        textColor: useAnimatedStyle(() => {
            return { color: textColor.value };
        }),
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, animatedStyles }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
