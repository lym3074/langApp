import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
// npm install @types/styled-components @types/styled-components-react-native

const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: center;
`;
const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const Y = new Animated.Value(0);
  const moveUp = () => {}

  return (
    <Container>
      <AnimatedBox style={{
        transform: [{translateY: Y}]
      }} onPress={moveUp}></AnimatedBox>
    </Container>
  );
}

// note)
// - 다른 컴포넌트를 anitation 컴포로 만들고 싶으면 createAnimatedComponent()를 사용한다.