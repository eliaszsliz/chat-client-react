import React, {Component} from 'react';

import styled from 'styled-components';

export default class ChatWindowMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',

      error: false
    };

    this.onSend = this.onSend.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onSend() {
    const { author, body } = this.state;
    this.props.onSend({ author, body });
    this.setState({
      body: ''
    })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSend();
    }
  }

  render() {
    return (<div>
      <FormField>
        <input type="text"
               placeholder="Author"
               onChange={(event) => {
                 this.setState({
                   author: event.target.value
                 })
               }}
        />
      </FormField>

      <FormField>
        <textarea cols="30" rows="10"
                  placeholder="Message body"
                  onChange={(event) => {
                    this.setState({
                      body: event.target.value
                    })
                  }}
                  onKeyPress={this.onKeyPress}

        />
      </FormField>

      <StyledButton onClick={this.onSend}>Send</StyledButton>
    </div>)
  }
}

const FormField = styled.div`
  & > * {
    width: calc(100% - 16px);
    padding: 8px;
  }
`;

const Message = styled.div`
    background: #e6fff2;
    padding: 12px;
    margin: 8px;
    display: inline-block;
`;

const StyledButton = styled.button`
  background-color: #6699ff;
  color: white;
  border: none;
  width: 100%;
  padding: 18px;
`;