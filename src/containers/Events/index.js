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
    getGiftHorseLottery,
    buyTrainTicket,
    buyDressUpTicket,
    buyShuffleDressUpTicket,
    getTrainTicketPrice,
    getDressUpTicketPrice,
    getShuffleDressUpTicketPrice
} from "../../utils/eth-function";
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
Modal.setAppElement('#root');

class Events extends Component{
    constructor(props){
        super(props);
        this.state={
            type: 'dress-up',
            trainLotteryTime: 0,
            shuffleLotteryTime: 0,
            shuffleAllLotteryTime: 0,
            giftHorseLotteryTime: 0,
            isTicketNumModalOpen: false,
            buyTicketNumber: 0,
            trainTicketPrice: 0,
            dressUpTicketPrice: 0,
            shuffleDressUpTicketPrice: 0
        }
    }
    componentDidMount(){
        const self = this;
        const account = window.web3.eth.accounts[0];
        getTrainLottery().then((result) => {
            const date = new Date(result.toNumber() * 1000 + 60 * 60 * 24 * 1000);
            console.log(date);
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
        });
        getTrainTicketPrice().then((result) => {
            self.setState({
                trainTicketPrice: window.web3.fromWei(result,'ether').toFixed(3)
            })
        });
        getDressUpTicketPrice().then((result) => {
            self.setState({
                dressUpTicketPrice: window.web3.fromWei(result,'ether').toFixed(3)
            })
        });
        getShuffleDressUpTicketPrice().then((result) => {
            self.setState({
                shuffleDressUpTicketPrice: window.web3.fromWei(result,'ether').toFixed(3)
            })
        })
    }
    renderLotteryButton(type){
        const now = new Date(Date.now());
        switch (type){
            case 'train':
                if(this.state.trainLotteryTime < now){
                    return (
                        <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doTrainLottery()}>
                            do a lottery
                        </button>
                    );
                }else{
                    return null
                }
            case 's-dressUp':
                if(this.state.shuffleAllLotteryTime < now){
                    return(
                        <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doShuffleAllLottery()}>
                            do a lottery
                        </button>
                    )
                }else{
                    return null
                }
            case 'dressUp':
                if(this.state.shuffleLotteryTime < now){
                    return(
                        <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doShuffleLottery()}>
                            do a lottery
                        </button>
                    )
                }else {
                    return null
                }
            case 'gift-horse':
                if(this.state.giftHorseLotteryTime < now){
                    return (
                        <button style={eventStyles.lotteryButton} className='lottery-button' onClick={()=>doGiftHorseLottery()}>
                            do a lottery
                        </button>
                    )
                }else{
                    return null
                }
            default:
                return null
        }
    }
    renderTicket(type){
        const now = new Date(Date.now());
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
                        {this.renderLotteryButton('train')}
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
                        {this.renderLotteryButton('gift-horse')}
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
                        {this.renderLotteryButton('dressUp')}
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
                        {this.renderLotteryButton('s-dressUp')}
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
    openTicketNumberModal(){
        this.setState({
            isTicketNumModalOpen: true
        })
    }
    closeTicketNumModal(){
        this.setState({
            isTicketNumModalOpen: false
        })
    }

    buyTickets(ticketNum) {
        switch (this.state.type){
            case 'dress-up':
                buyDressUpTicket(ticketNum*this.state.dressUpTicketPrice);
                break;
            case 'shuffle-dress-up':
                buyShuffleDressUpTicket(ticketNum*this.state.shuffleDressUpTicketPrice);
                break;
            case 'training':
                buyTrainTicket(ticketNum*this.state.trainTicketPrice);
                break;
            default:
                return;
        }
    }

    changeBuyTicketNum(e){
        this.setState({
            buyTicketNumber: e.target.value
        })
    }
    returnPrice(type){
        switch (type){
            case 'training':
                return this.state.trainTicketPrice;
            case 'dress-up':
                return this.state.dressUpTicketPrice;
            case 'shuffle-dress-up':
                return this.state.shuffleDressUpTicketPrice;
            default:
                return 0;
        }
    }

    render(){
        const { type } = this.state;
        return (
            <div style={eventStyles.outerContainer}>
                <Modal
                    isOpen={this.state.isTicketNumModalOpen}
                    onRequestClose={()=>this.closeTicketNumModal()}
                    style={eventStyles.modalStyle}
                >
                    <div style={eventStyles.modalTopText}>
                        Choose Ticket Number you buy.
                    </div>
                    <TextField
                        type='number'
                        inputProps={{step: 1, min: 1}}
                        value={this.state.buyTicketNumber}
                        onChange={e=>this.changeBuyTicketNum(e)}
                    /> tickets x {this.returnPrice(type)} ETH
                    <Button color='primary' onClick={()=>this.buyTickets(this.state.buyTicketNumber)} >
                        Buy
                    </Button>
                </Modal>
                <div style={eventStyles.innerContainer}>
                    <img
                        src={gif}
                        width="1080px"
                        height="608px"
                    />
                    {this.renderTicket(type)}
                    {this.state.type ===' gift-horse' ? null : <button style={eventStyles.buyTicket} onClick={()=>this.openTicketNumberModal()}>buy ticket ></button>}
                    <div style={eventStyles.ticketContainer}>
                        <div style={eventStyles.buyTicketText}>choose a ticket</div>
                        <div style={eventStyles.buyTicketText}>▽</div>
                        <div style={eventStyles.ticketInnerContainer}>
                            <div style={eventStyles.tickerWrapper} className='event-back-dress-up'>
                                <button
                                    style={eventStyles.ticketButton(type,'dress-up')}
                                    className='event-dress-up'
                                    onClick={()=>this.changeTicketType('dress-up')}
                                />
                            </div>
                            <div style={eventStyles.tickerWrapper} className='event-back-shuffle-dress-up'>
                                <button
                                    style={eventStyles.ticketButton(type,'shuffle-dress-up')}
                                    className='event-shuffle-dress-up'
                                    onClick={()=>this.changeTicketType('shuffle-dress-up')}
                                />
                            </div>
                            <div style={eventStyles.tickerWrapper} className='event-back-training'>
                                <button
                                    style={eventStyles.ticketButton(type,'training')}
                                    className='event-training'
                                    onClick={()=>this.changeTicketType('training')}
                                />
                            </div>
                            <div style={eventStyles.tickerWrapper} className='event-back-gift-horse'>
                                <button
                                    style={eventStyles.ticketButton(type,'gift-horse')}
                                    className='event-gift-horse'
                                    onClick={()=>this.changeTicketType('gift-horse')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events
