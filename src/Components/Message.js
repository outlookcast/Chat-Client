import React, * as react from "react";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Message extends react.Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{this.props.time}</Typography>
                        <Avatar>{this.props.userName.charAt(0)}</Avatar>
                        <Typography variant="h5" component="h2">{this.props.userName}</Typography>
                        <Typography component="p">{this.props.messageBody}</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Message;