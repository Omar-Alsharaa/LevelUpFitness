import React from 'react';
import { Animated, Platform } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const LoadingText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-family: ${Platform.select({
    web: 'Orbitron',
    default: props => props.theme.fonts.heading
  })};
  font-size: ${props => props.theme.fontSizes.xl}px;
  margin-top: 20px;
`;

const GradientWrapper = styled.View`
  width: 100px;
  height: 100px;
  border-radius: ${Platform.select({
    web: '50%',
    default: '50px'
  })};
  overflow: hidden;
`;

const LoadingScreen = () => {
  const [rotation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: Platform.select({
          web: false,
          default: true
        }),
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LoadingContainer>
      <Animated.View 
        style={[
          Platform.select({
            web: {
              transform: `rotate(${spin._value}deg)`,
            },
            default: {
              transform: [{ rotate: spin }],
            },
          }),
        ]}
      >
        <GradientWrapper>
          <LinearGradient
            colors={['#2FE7F0', '#7F00FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </GradientWrapper>
      </Animated.View>
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 