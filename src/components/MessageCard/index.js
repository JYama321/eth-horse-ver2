import React, { Component } from 'react'
import { styles } from './styles'
import PropTypes from 'prop-types'

class MessageCard extends Component{
    static propTypes = {
        message: PropTypes.string.isRequired,
        isShown: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state={
            className: 'hide-flash-message',
            message: ''
        }
    }

    componentWillReceiveProps(props){
        if(props.isShown){
            this.setState({
                className: 'show-flash-message',
                message: props.message
            });
        }else{
            this.setState({
                className: 'hide-flash-message',
                message: props.message
            })
        }
    }

    render(){
        return(
            <div style={styles.alertMessage} className={this.state.className}>
                {this.state.message}
            </div>
        )
    }
}

export default MessageCard