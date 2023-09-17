import React, { useEffect, useState } from 'react';
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
`

export default function App() {
  const [y, setY] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const moveUp = () => {
    const id = setInterval(() => {
      setY(prev => prev + 1);
    }, 5);

    setIntervalID(id);
  };

  useEffect(()=> {
    if(y >= 200) {
      clearInterval(intervalID);
    }
  },[y, intervalID])

  return (
    <Container>
      <Box style={{
        transform: [{translateY: y}]
      }} onPress={moveUp}></Box>
    </Container>
  );
}
