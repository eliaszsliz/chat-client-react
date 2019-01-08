import React, {Component} from 'react';
import styled from 'styled-components';
import ChatWindowMessage from "./ChatWindowMessage";
import ChatWindowInput from "./ChatWindowInput";

const toDate = require('normalize-date');

const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL;

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesWrapperRef = React.createRef();

    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSocketOpen = this.handleSocketOpen.bind(this);
    this.handleSocketError = this.handleSocketError.bind(this);
    this.handleMessageRecieve = this.handleMessageRecieve.bind(this);

    this.socket = new WebSocket(WEB_SOCKET_URL);
    this.socket.onopen = this.handleSocketOpen;
    this.socket.onerror = this.handleSocketError;
    this.socket.onmessage = this.handleMessageRecieve;
  }

  addMessage(message) {
    const date = message.date ? toDate(message.date) : toDate(Date.now())

    const source = message.origin || 'OTHER';
    const author = message.author || source;

    this.setState(prevState => ({
      messages: [...prevState.messages, {
        ...message,
        date,
        author,
        origin: source,
      }]
    }), () => {
      this.messagesWrapperRef.current.scrollTo(0, this.messagesWrapperRef.current.scrollHeight);
    })
  }

  sendMessage(message) {
    console.log(JSON.stringify(message))
    this.socket.send(JSON.stringify(message));
  }

  handleMessageRecieve(event) {
    const message = JSON.parse(event.data);
    this.addMessage(message);
  }

  handleSocketOpen() {
    this.addMessage({
      body: 'Socket opening...',
      date: Date.now(),
      origin: 'SERVER',
    });
  }

  handleSocketError() {
    this.addMessage({
      body: 'Cannot connect to the server...',
      date: Date.now(),
      origin: 'ERROR',
    });
  }

  render() {
    return (
      <div>
        <MessagesWrapper ref={this.messagesWrapperRef}>
          {this.state.messages.map((message, index) => {
            return <ChatWindowMessage key={index} {...message} />
          })}
        </MessagesWrapper>

        <ChatWindowInput onSend={this.sendMessage} />
      </div>
    );
  }
}

export default ChatWindow;

const MessagesWrapper = styled.div`
    border: 1px solid #ccc;
    height: 500px;
    overflow-y: auto;
`;

