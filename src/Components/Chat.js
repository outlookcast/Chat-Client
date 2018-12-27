import React, { Component } from "react";
import Message from "./Message"

const signalR = require('@aspnet/signalr');
const moment = require('moment');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userName: this.props.userName,
            connection: null
        };
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
        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages: messages
        });
        console.log("message ==>", message);
    }

    SendMessage() {
        this.state.connection.invoke("sendMessage", this.state.userName, "kk eae men");
    }

    renderMessages(){
        return this.state.messages.map(element => {
            return (<Message key={element} userName={element.userName} messageBody={element.messageBody} time={element.time}/>)
        })
    }

    render() {
        return (
            <div className="content">
                <p>Chat work's</p>
                {this.renderMessages()}
            </div>
        )
    }
}

export default Chat;