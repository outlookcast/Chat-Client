import React, { Component } from 'react';
import './App.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const signalR = require('@aspnet/signalr');
const moment = require('moment');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userName: null,
      connection: null,
      connected: false
    }
  }

  async componentDidMount() {
    var connection = await new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:50000/chatHub")
      .build();
    await connection.start();
    connection.on("MessageChannel", data => {
      console.log("MessageChannel ==>", data);
      this.formatMessage(data);
    });
    this.setState({
      connection: connection
    }, () => {
      this.SendMessage();
    });
  }

  formatMessage(message) {
    message.time = moment.utc(message.time).local().format("DD/MM/YYYY - HH:mm:ss").toString();
    console.log("message ==>", message);
  }

  SendMessage() {
    this.state.connection.invoke("sendMessage", "Vinicius", "kk eae men");
  }

  render() {
    if(!this.state.connected){
      return (
        <div className="App">
        <header className="App-header">
          <p style={{color: 'black'}}>Welcome to the Grudinho's chat!!</p>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">Please, put your name</InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            <Button variant="contained" style={{marginTop: '20px'}}>Enter</Button>
          </FormControl>
        </header>
      </div>
      );
    }
    else{
      return (
        <div>
          <p>Em construcao!</p>
        </div>
      )
    }
  }
}

export default App;
