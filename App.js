import React, { useEffect, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
// npm install @types/styled-components @types/styled-components-react-native

const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const Y = new Animated.Value(0);
  const moveUp = () => {
    // Animated.timing(Y, {
    //   toValue: 200,
    //   useNativeDriver: true
    // }).start();
    Animated.spring(Y, {
      toValue: 200,
      useNativeDriver: true,
      bounciness:30
    }).start();
  }

  // Y의 값을 보고 싶다면
  // Y.addListener(()=> {console.log(Y)});

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{transform: [{translateY: Y}]}}
        />
      </TouchableOpacity>
      
    </Container>
  );
}

// note)
// - 다른 컴포넌트를 anitation 컴포로 만들고 싶으면 createAnimatedComponent()를 사용한다.

// animations config
// animated.decay() : 객체나 느리게 멈추는 기능
// animated.spring() : 물리 모델 제공
// animated.timing() : 타이밍