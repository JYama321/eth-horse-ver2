import React, { Component } from 'react'
import { ticketStyle } from "./styles";
import PropTypes from 'prop-types'

class TicketCard extends Component{
  static propTypes = {
    className: PropTypes.string.isRequired
  };
  render(){
    return (
        <button style={ticketStyle.ticketContainer} className={this.props.className} />
    )
  }
}

export default TicketCard;
