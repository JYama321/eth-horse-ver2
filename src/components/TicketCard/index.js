import React, { Component } from 'react'
import { ticketStyle } from "./styles";

class TicketCard extends Component{
  render(){
    return (
        <button style={ticketStyle.ticketContainer} className='ticketBack'/>
    )
  }
}

export default TicketCard;
