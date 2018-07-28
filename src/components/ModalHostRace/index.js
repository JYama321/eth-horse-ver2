import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { hostModalStyle } from "./styles";
import { hostRace } from "../../utils/eth-function";
import MessageCard from "../MessageCard";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    raceName: {
        height: '60px',
        width: '50%',
        top: '10px',
        marginLeft: '35px'
    },
    numberField: {
        height: '60px',
        top: '10px',
        width: '50px'
    }
});
Modal.setAppElement('#root');

class HostRaceModal extends Component{
    static propTypes={
        closeModal: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    constructor(props){
        super(props);
        this.state={
            raceName: '',
            prizeRate: 0,
            minWinnerPrize: 0,
            deposit: 0,
            isMessageCardShow: false,
            alertMessage: ''
        }
    }
    changeRaceName(e){
        this.setState({
            raceName: e.target.value
        })
    }
    changePrizeRate(e){
        this.setState({
            prizeRate: e.target.value
        })
    }
    changeMinWinnerPrize(e){
        this.setState({
            minWinnerPrize: e.target.value
        })
    }
    changeDeposit(e){
        this.setState({
            deposit: e.target.value
        })
    }

    showAlertMessage(message){
        console.log(message)
        this.setState({
            isMessageCardShow: true,
            alertMessage: message
        });
        window.setTimeout(()=>{
            console.log('uhoho')
            this.setState({
                isMessageCardShow: false
            })
        },4500)
    }

    holdRace(){
        //レースに関するvalidation
        //1, race name cannot be empty
        if(this.state.raceName.length === 0){this.showAlertMessage('race name must not be empty'); return;}
        //2, deposit must higher than 0.1ETH
        if(this.state.deposit < 0.1){this.showAlertMessage('deposit must be higher than 0.1 ETH'); return;}
        //3, min winner prize should be lower than deposit
        if(this.state.minWinnerPrize >= this.state.deposit){this.showAlertMessage('deposit must be greater than min winner prize'); return;}
        //4, rate for prize cannot be 0
        if(this.state.winnerPrizeFromBet === 0){this.showAlertMessage('rate for prize in total bet cannot be 0');return;}
        hostRace({
            raceName: this.state.raceName,
            minWinnerPrize: window.web3.toWei(this.state.minWinnerPrize,'ether'),
            winnerPrizeFromBet: this.state.prizeRate,
            deposit: window.web3.toWei(this.state.deposit, 'ether')
        })
    }
    render(){
        return (
            <Modal
                isOpen={this.props.isActive}
                onRequestClose={this.props.closeModal}
                style={hostModalStyle.modalStyle}
            >
                <MessageCard message={this.state.alertMessage} isShown={this.state.isMessageCardShow}/>
                <div style={hostModalStyle.modalHeader}>
                    hold race
                </div>
                <div style={hostModalStyle.formContainer}>
                    <TextField
                        className={this.props.classes.raceName}
                        type='string'
                        value={this.state.raceName}
                        onChange={e=>this.changeRaceName(e)}
                        placeholder={'RaceName'}
                    />
                </div>
                <div style={hostModalStyle.formContainer}>
                    <p style={hostModalStyle.textStyle}><b>Minimum Winner Horse Prize</b></p>
                    <TextField
                        className={this.props.classes.numberField}
                        type='number'
                        inputProps={{step: 0.01, min: 0.01}}
                        value={this.state.minWinnerPrize}
                        onChange={e=>this.changeMinWinnerPrize(e)}
                    />ETH
                </div>
                <div style={hostModalStyle.formContainer}>
                    <p style={hostModalStyle.textStyle}><b>Rate for race prize in total bet</b></p>
                    <TextField
                        className={this.props.classes.numberField}
                        type='number'
                        inputProps={{step: 1,min: 0, max: 50}}
                        value={this.state.prizeRate}
                        onChange={e=>this.changePrizeRate(e)}
                    /> % of total bet
                </div>
                <div style={hostModalStyle.formContainer}>
                    <p style={hostModalStyle.textStyle}><b>Deposit</b></p>
                    <TextField
                        className={this.props.classes.numberField}
                        type='number'
                        inputProps={{step: 0.1,min: 0.1}}
                        value={this.state.deposit}
                        onChange={e=>this.changeDeposit(e)}
                    /> ETH
                </div>
                <button style={hostModalStyle.holdRaceButton}
                        className="eth-balance-back"
                        onClick={()=>this.holdRace()}
                >Hold Your Race</button>
            </Modal>
        )
    }
}


export default withStyles(styles)(HostRaceModal);
