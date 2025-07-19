import React from 'react';
import { View } from 'react-native';
import { theme } from '../styles/theme';

export const ScreenWrapper = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      {children}
    </View>
  );
}; 