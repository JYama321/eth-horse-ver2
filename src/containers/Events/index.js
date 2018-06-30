import React, { Component } from 'react'
import { eventStyles } from "./styles";
import gif from '../../assets/static_assets/start_movie.gif'
import trainingImage from '../../assets/static_assets/event-training.png'
import giftHorseImage from '../../assets/static_assets/event-gifthorse.png'
import dressUpImage from '../../assets/static_assets/event-dressup.png'
import shuffleDressUpImage from '../../assets/static_assets/event-shuffle-dressup.png'
import {
  doTrainLottery,
  doShuffleAllLottery,
  doShuffleLottery,
  doGiftHorseLottery,
  getTrainLottery,
  getShuffleLottery,
  getShuffleAllLottery,
  getGiftHorseLottery
} from "../../utils/eth-function";

class Events extends Component{
  constructor(props){
    super(props);
    this.state={
      type: 'dress-up',
      trainLotteryTime: 0,
      shuffleLotteryTime: 0,
      shuffleAllLotteryTime: 0,
      giftHorseLotteryTime: 0
    }
  }
  componentDidMount(){
    const self = this;
    getTrainLottery().then((result) => {
      const date = new Date(result.toNumber() * 1000 + 60 * 60 * 24 * 1000);
      self.setState({
        trainLotteryTime: date
      })
    });
    getShuffleLottery().then((result) => {
      const date = new Date(result.toNumber() * 1000 + 60 * 60 * 24 * 1000);
      self.setState({
        shuffleLotteryTime: date
      })
    });
    getShuffleAllLottery().then((result) => {
      const date = new Date(result.toNumber() * 1000 + 60 * 60 * 24 * 1000);
      self.setState({
        shuffleAllLotteryTime: date
      })
    });
    getGiftHorseLottery().then((result) => {
      const date = new Date(result.toNumber() * 1000 + 60 * 60 * 24 * 1000);
      self.setState({
        giftHorseLotteryTime: date
      })
    })
  }
  renderTicket(type){
    const now = Date.now();
    switch(type){
      case 'training':
        return (
            <div style={eventStyles.eventTicket} className='event-back-training'>
              <img
                  src={trainingImage}
                  style={eventStyles.eventImage}
              />
              <p style={eventStyles.eventText(this.state.trainLotteryTime < now)}>
                {this.state.trainLotteryTime < now ? 'Do a lottery for free to get a ticket!' : 'You can lot only once a day. Wait a moment! '}
              </p>
              <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doTrainLottery()}>
                do a lottery
              </button>
            </div>
        );
      case 'gift-horse':
        return (
            <div style={eventStyles.eventTicket} className='event-back-gift-horse'>
              <img
                  src={giftHorseImage}
                  style={eventStyles.eventImage}
              />
              <p style={eventStyles.eventText(this.state.giftHorseLotteryTime < now)}>
                {this.state.giftHorseLotteryTime < now ? 'Do a lottery for free to get a horse!' : 'You can lot only once a day. Wait a moment! '}
              </p>
              <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doGiftHorseLottery()}>
                do a lottery
              </button>
            </div>
        );
      case 'dress-up':
        return (
            <div style={eventStyles.eventTicket} className='event-back-dress-up'>
              <img
                  src={dressUpImage}
                  style={eventStyles.eventImage}
              />
              <p style={eventStyles.eventText(this.state.shuffleLotteryTime < now)}>
                {this.state.shuffleLotteryTime < now ? 'Do a lottery for free to get a ticket!' : 'You can lot only once a day. Wait a moment! '}
              </p>
              <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doShuffleLottery()}>
                do a lottery
              </button>
            </div>
        );
      case 'shuffle-dress-up':
        return (
            <div style={eventStyles.eventTicket} className='event-back-shuffle-dress-up'>
              <img
                  src={shuffleDressUpImage}
                  style={eventStyles.eventImage}
              />
              <p style={eventStyles.eventText(this.state.shuffleAllLotteryTime < now)}>
                {this.state.shuffleAllLotteryTime < now ? 'Do a lottery for free to get a ticket!' : 'You can lot only once a day. Wait a moment! '}
              </p>
              <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doShuffleAllLottery()}>
                do a lottery
              </button>
            </div>
        );
      default:
        return null
    }
  }
  changeTicketType(type){
    this.setState({
      type: type
    })
  }
  render(){
    const { type } = this.state;
    return (
        <div style={eventStyles.outerContainer}>
          <div style={eventStyles.innerContainer}>
            <img
                src={gif}
                width="1080px"
                height="608px"
            />
            {this.renderTicket(type)}
            {this.state.type ===' gift-horse' ? null : <button style={eventStyles.buyTicket} className='event-buy-ticket-back'>buy ticket</button>}
            <div style={eventStyles.ticketContainer}>
              <button
                  style={eventStyles.ticketButton(type,'dress-up')}
                  className='event-dress-up'
                  onClick={()=>this.changeTicketType('dress-up')}
              />
              <button
                  style={eventStyles.ticketButton(type,'shuffle-dress-up')}
                  className='event-shuffle-dress-up'
                  onClick={()=>this.changeTicketType('shuffle-dress-up')}
              />
              <button
                  style={eventStyles.ticketButton(type,'training')}
                  className='event-training'
                  onClick={()=>this.changeTicketType('training')}
              />
              <button
                  style={eventStyles.ticketButton(type,'gift-horse')}
                  className='event-gift-horse'
                  onClick={()=>this.changeTicketType('gift-horse')}
              />
            </div>
          </div>
        </div>
    )
  }
}

export default Events
