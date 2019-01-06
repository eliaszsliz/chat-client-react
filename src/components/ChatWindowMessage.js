import React from 'react';

import styled from 'styled-components';

export default function ChatWindowMessage(props) {
  return (<MessageWrapper>
    <Message origin={props.origin}>
      <b>{props.author}</b> {props.body}
    </Message>
  </MessageWrapper>)
}

const MessageWrapper = styled.div`
        
`;

const Message = styled.div`
    background-color: ${ props => {
      switch (props.origin.toLowerCase()){
        case 'error':
          return 'lightcoral'
        case 'server':
          return 'lightblue'
        default:
          return 'lightgray'
      }      
    }};

    padding: 12px;
    margin: 8px;
    display: inline-block;
`;