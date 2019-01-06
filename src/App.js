import React, { Component } from 'react';
import styled from 'styled-components';
import ChatWindow from './components/ChatWindow.js'

class App extends Component {
  render() {
    return (
      <AppWrapper>
          <ChatWindow />
      </AppWrapper>
    );
  }
}

export default App;

const AppWrapper = styled.div`
  width: 500px;
  margin: 60px auto;
`;