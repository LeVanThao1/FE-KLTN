import React from 'react';

import {StatusBar, ScrollView} from 'react-native';

import styled from 'styled-components/native';

import AppBar from './appBar';
import ToolBar from './toolBar';
import Users from './users';
import Feed from './feed';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const PostFb = () => {
  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Container>
        <ScrollView>
          <AppBar />
          <ToolBar />
          <Users />
          <Feed />
        </ScrollView>
      </Container>
    </>
  );
};

export default PostFb;
