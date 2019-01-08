import React from 'react';

import styled from 'styled-components';

export default function ChatWindowMessage(props) {
  const { date } = props;
  const hh = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  const readableDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${hh}:${mm}`;

  return (<MessageWrapper>
    <Message origin={props.origin}>
      <b>{props.author} - {readableDate}</b> {props.body}
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