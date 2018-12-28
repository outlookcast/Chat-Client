import React, { Component } from "react";
import Message from "./Message"
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../App.css";

const signalR = require('@aspnet/signalr');
const moment = require('moment');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userName: this.props.userName,
            connection: null,
            message: "",
            open: false
        };
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
                    <DialogContentText>{"Por favor, digite uma mensagem."}</DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    async componentDidMount() {
        var connection = await new signalR.HubConnectionBuilder()
            .withUrl("https://viniciuschatsignalr.azurewebsites.net/chatHub")
            .build();
        await connection.start();
        connection.on("MessageChannel", data => {
            this.formatMessage(data);
        });
        this.setState({
            connection: connection
        }, () => {
            console.log("Connected!");
        });
    }

    formatMessage(message) {
        message.time = moment.utc(message.time).local().format("DD/MM/YYYY - HH:mm:ss").toString();
        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages: messages
        });
    }

    SendMessage() {
        if (this.state.connection) {
            this.state.connection.invoke("sendMessage", this.state.userName, this.state.message);
            this.setState({
                message: ""
            });
        }
    }

    renderMessages() {
        return this.state.messages.map(element => {
            return (<Message key={element.id} userName={element.userName} messageBody={element.messageBody} time={element.time} />)
        })
    }

    render() {
        return (
            <div>
                {this.dialogRender()}
                <header className="Chat-Header">Welcome to the chatroom</header>
                <div style={{
                    maxHeight: '82vh',
                    overflowY: 'scroll'
                }}>
                    {this.renderMessages()}
                </div>
                <div className="footer">
                    <FormControl style={{
                        width: '80%',
                        marginTop: '20px'
                    }}>
                        <Input onChange={(event) => {
                            this.setState({
                                message: event.target.value
                            })
                        }}
                            value={this.state.message} />
                    </FormControl>
                    <Button variant="contained" style={{ width: '15%', position: 'right', marginTop: '15px', marginLeft: '10px' }} onClick={() => {
                        if (this.state.message.length > 0) {
                            this.SendMessage();
                        } else {
                            this.handleClickOpen();
                        }

                    }} color="secondary">Send</Button>
                </div>
            </div>
        )
    }
}

export default Chat;