import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Feed from './feed';
const Container = styled.SafeAreaView`
  flex: 1;
  background: #dddddd;
  padding: 0 12px;
`;
const PostFb = () => {
  return (
    <>
      <Container>
        <ScrollView>
          <Feed />
        </ScrollView>
      </Container>
    </>
  );
};
export default PostFb;
