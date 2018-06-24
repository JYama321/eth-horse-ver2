import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { hostModalStyle } from "./styles";
import { hostRace } from "../../utils/eth-function";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
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
      deposit: 0
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
  render(){
    return (
        <Modal
            isOpen={this.props.isActive}
            onRequestClose={this.props.closeModal}
            style={hostModalStyle.modalStyle}
        >
          <div style={hostModalStyle.formContainer}>
            <p style={hostModalStyle.textStyle}><b> Race Name</b></p>
            <TextField
                type='string'
                value={this.state.raceName}
                onChange={e=>this.changeRaceName(e)}
            />
          </div>
          <div style={hostModalStyle.formContainer}>
            <p style={hostModalStyle.textStyle}><b>Minimum Winner Horse Prize</b></p>
            <TextField
                type='number'
                inputProps={{step: 0.01, min: 0.01}}
                value={this.state.minWinnerPrize}
                onChange={e=>this.changeMinWinnerPrize(e)}
            />ETH
          </div>
          <div style={hostModalStyle.formContainer}>
            <p style={hostModalStyle.textStyle}><b>Rate for race prize in total bet</b></p>
            <TextField
                type='number'
                inputProps={{step: 1,min: 0, max: 50}}
                value={this.state.prizeRate}
                onChange={e=>this.changePrizeRate(e)}
            /> % of total bet
          </div>
          <div style={hostModalStyle.formContainer}>
            <p style={hostModalStyle.textStyle}><b>Deposit</b></p>
            <TextField
                type='number'
                inputProps={{step: 0.1,min: 0.1}}
                value={this.state.deposit}
                onChange={e=>this.changeDeposit(e)}
            /> ETH
          </div>
          <button style={hostModalStyle.holdRaceButton}
                  className="holdRaceButton"
                  onClick={()=>hostRace({
                    raceName: this.state.raceName,
                    minWinnerPrize: window.web3.toWei(this.state.minWinnerPrize,'ether'),
                    winnerPrizeFromBet: this.state.prizeRate,
                    deposit: window.web3.toWei(this.state.deposit, 'ether')
                  })}
          >Hold Your Race</button>
        </Modal>
    )
  }
}


export default withStyles(styles)(HostRaceModal);
