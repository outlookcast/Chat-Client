import React, { Component } from 'react';
import './App.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Chat from "./Components/Chat"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      userName: "",
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  dialogRender() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Alerta"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Por favor, digite um nome."}</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }


  render() {
    if (!this.state.connected) {
      return (
        <div className="App">
          {this.dialogRender()}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Grudinho's Chat
          </Typography>
            </Toolbar>
          </AppBar>
          <header className="App-header">
            <p style={{ color: 'black' }}>Welcome to the Grudinho's chat!!</p>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">Please, put your name</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                onChange={(event) => {
                  this.setState({
                    userName: event.target.value
                  })
                }}
              />
              <Button variant="contained" style={{ marginTop: '20px' }} onClick={() => {
                if(this.state.userName.length > 0){
                  this.setState({
                    connected: true
                  });
                } else {
                  this.handleClickOpen();
                }
                
              }}>Enter</Button>
            </FormControl>
          </header>
        </div>
      );
    }
    else {
      return (
        <div>
          {this.dialogRender()}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Grudinho's Chat
          </Typography>
            </Toolbar>
          </AppBar>
          <Chat userName={this.state.userName} />
          <p>Em construcao!</p>
        </div>
      )
    }
  }
}

export default App;
