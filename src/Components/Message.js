import React, * as react from "react";
import Avatar from '@material-ui/core/Avatar';

class Message extends react.Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div>
                <Avatar>{this.props.userName.charAt(0)}</Avatar>
                
            </div>
        );
    }
}

export default Message;