import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, TouchableOpacity } from 'react-native';
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
  const POSITION = useRef(new Animated.ValueXY({x: 0, y: 300})).current;
  // useRef는 lifeTime동안 object를 지속시켜 준다.
  // 렌더링 시 값이 초기화되는 것을 막아준다.
  const [up, setUp] = useState(false);

  const toggleUp = () => setUp(prev => !prev);

  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up? 300 : -300,
      useNativeDriver: true,
      duration: 1000
    }).start(toggleUp); // end될 때의 콜백함수
  }
  const rotateY = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"]
  })

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300], // 대상에서 어떤 값을 갖고 올 것인지 정의
    outputRange : [100, 0]
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"]
  })

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{transform: [{rotateY},{translateY: POSITION.y}], borderRadius, backgroundColor: bgColor}}
        />
      </Pressable>
      
    </Container>
  );
}

// note)
// - 다른 컴포넌트를 anitation 컴포로 만들고 싶으면 createAnimatedComponent()를 사용한다.

// animations config
// animated.decay() : 객체나 느리게 멈추는 기능
// animated.spring() : 물리 모델 제공
// animated.timing() : 타이밍

// interpolation : 보간 -> 중간값 추정