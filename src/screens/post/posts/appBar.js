import React from 'react';

import styled from 'styled-components/native';

// import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon} from 'native-base';

const Container = styled.View`
  width: 100%;
  height: 58px;
  padding: 0 11px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const Text = styled.Text`
  color: #3a86e9;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.3px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Button = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eeeeee;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const AppBar = () => {
  return (
    <Container>
      <Text>facebook</Text>
      <Row>
        <Button>
          <Icon name="search" type="Feather" size={29} color="black" />
        </Button>

        <Button>
          <Icon
            name="facebook-messenger"
            type="MaterialCommunityIcons"
            size={29}
          />
        </Button>
      </Row>
    </Container>
  );
};

export default AppBar;
