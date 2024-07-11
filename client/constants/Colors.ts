export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: '#2f95dc',
    icon: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    tint: '#2f95dc',
    icon: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
  },
};

export type ThemeType = keyof typeof Colors;
