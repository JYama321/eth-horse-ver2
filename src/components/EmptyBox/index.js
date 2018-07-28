import React,{Component} from 'react'
import { styles } from './styles'
import PropTypes from 'prop-types'

class EmptyBox extends React.PureComponent{
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    render() {
        switch (this.props.type) {
            case 'horse':
                return (
                    <div style={styles.emptyBox}>
                        No Horse
                    </div>
                );
            case 'activity':
                return (
                    <div style={styles.emptyBoxActivity}>
                        No Activity
                    </div>
                );
            case 'ticket':
                return (
                    <div style={styles.emptyBoxTickets}>
                        No Tickets
                    </div>
                );
            default:
                return (
                    <div style={styles.emptyBox}>
                        Empty
                    </div>
                );
        }
    }
}

export default EmptyBox