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

    this.handleSendAttempt = this.handleSendAttempt.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }

  handleSendAttempt() {
    if (this.hasErrors()){
      this.setState({ error: true })
    }
    else {
      const { author, body } = this.state;
      this.props.onSend({
        author,
        body
      });
      this.setState({
        body: ''
      })
    }
  }

  hasErrors() {
    const { author, body } = this.state;
    return author.trim().length === 0 || body.trim().length === 0;
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSendAttempt();
    }
  }

  render() {
    return (<div>
      <FormField error={this.state.error && !this.state.author.trim().length}>
        <input type="text"
               placeholder="Author"
               onChange={(event) => {
                 this.setState({
                   author: event.target.value,
                   error: false,
                 })
               }}
        />
      </FormField>

      <FormField error={this.state.error && !this.state.body.trim().length}>
        <textarea cols="30" rows="10"
                  placeholder="Message body"
                  value={this.state.body}
                  onChange={(event) => {
                    this.setState({
                      body: event.target.value,
                      error: false,
                    })
                  }}
                  onKeyPress={this.handleKeyPress}

        />
      </FormField>

      <StyledButton onClick={this.handleSendAttempt}>Send</StyledButton>

      <ErrorMessage
        className='ChatWindowInput__Error'
        error={this.state.error}
      >
        Fill in author and message field, please
      </ErrorMessage>
    </div>)
  }
}

const FormField = styled.div`
  & > * {
    width: calc(100% - 16px);
    padding: 8px;
    
    ${ (props) => props.error ? `
      border: 2px solid indianred;
    ` : null}
  }
`;

const StyledButton = styled.button`
  background-color: #6699ff;
  color: white;
  border: none;
  width: 100%;
  padding: 18px;
`;

const ErrorMessage = styled.div`
  display: ${ props => props.error ? null : 'none'};
  color: indianred;
  padding: 8px;
  text-align: center;
`;