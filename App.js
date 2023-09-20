import React, {useRef } from 'react';
import { Animated, PanResponder, View} from 'react-native';
import styled from 'styled-components/native';
import {Ionicons} from "@expo/vector-icons";
// npm install @types/styled-components @types/styled-components-react-native

const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color:white;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
`;

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const retation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    
    // extrapolate: "clamp" /** range 바깥으로 넘어갔을 때의 처리 clamp : 범위 내로 제한, extend: 무제한, identity: 지 맘대로 */ 
  })

  const onPressIn = () => Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true
  }).start();

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true
  });
  
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true
  })
  
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onPressIn();
    },
    onPanResponderMove: (_,{dx}) => {
      position.setValue(dx)
    },
    onPanResponderRelease: (_, {dx}) => {
      if(dx < - 280) {
        Animated.spring(position, {toValue: -400, useNativeDriver: true}).start();
      } else if(dx > 280) {
        Animated.spring(position, {toValue: 400, useNativeDriver: true}).start();
      } else {
        Animated.parallel([ onPressOut, goCenter]).start();
      }
      
    }
  })).current;

  return (
    <Container>
      <Card 
        {...panResponder.panHandlers}
        style={{
          transform: [{scale: scale}, {translateX: position}, {rotateZ: retation}]
        }}
      >
        <Ionicons name='pizza' color="#192a56" size={98}/>
      </Card>
    </Container>
  );
}

// note)
// - 다른 컴포넌트를 anitation 컴포로 만들고 싶으면 createAnimatedComponent()를 사용한다.

// animations config
// animated.decay() : 객체나 느리게 멈추는 기능
// animated.spring() : 물리 모델 제공
// animated.timing() : 타이밍

// interpolation : 보간 -> 중간값 추정 두 사이의 값

// useRef는 lifeTime동안 object를 지속시켜 준다.
// 렌더링 시 값이 초기화되는 것을 막아준다.

// [4.12] android에 box-shadow가 적용이 안되면 elevation을 사용한다.