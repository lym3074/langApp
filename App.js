import React, {useRef } from 'react';
import { Animated, PanResponder} from 'react-native';
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
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0
  })).current;

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true, // 터치, 드래그 등 프래스 이벤트를 set해준다는 의미
    onPanResponderMove: (_,{dx, dy}) => {
      POSITION.setValue({ // POSITION = {x,y} 이거 안됨.
        x: dx,
        y: dy
      })
    }
  })).current
  
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
        <AnimatedBox
          {...panResponder.panHandlers}
          style={{transform: [...POSITION.getTranslateTransform()], borderRadius, backgroundColor: bgColor}}
        />
      
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

// useRef는 lifeTime동안 object를 지속시켜 준다.
// 렌더링 시 값이 초기화되는 것을 막아준다.