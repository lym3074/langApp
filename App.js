import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
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
  const Y = useRef(new Animated.Value(0)).current;
  // useRef는 lifeTime동안 object를 지속시켜 준다.
  // 렌더링 시 값이 초기화되는 것을 막아준다.
  const [up, setUp] = useState(false);

  const toggleUp = () => setUp(prev => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up? 200 : -200,
      useNativeDriver: true,
      easing: Easing.circle
    }).start(toggleUp); // end될 때의 콜백함수
  }

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