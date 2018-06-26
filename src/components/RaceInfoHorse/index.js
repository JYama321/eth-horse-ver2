import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HorseImage from '../HorseImage'
import { raceInfoHorseStyle } from "./styles";
import {
  getHorseData,
  getBetInfo,
  getOdds,
  betRace
} from "../../utils/eth-function";
import {horseStatus} from "../../utils/functions";
const loadingGif = require('../../assets/static_assets/umaloading.gif');


class RaceInfoHorse extends Component {
  static propTypes = {
    horseInfo: PropTypes.object.isRequired,
    horseId: PropTypes.number.isRequired,
    horseNum: PropTypes.number.isRequired,
    getHorseInfo: PropTypes.func.isRequired,
    race: PropTypes.array.isRequired,
    isWanted: PropTypes.bool.isRequired,
    isBetting: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
  };
  constructor(props){
    super(props);
    this.state={
      betNum: 0.00,
      odds: 0.00,
      isSomeoneBet: false,
      betAmount: 0,
      maxBet: 0
    }
  }
  componentDidMount(){
    const self = this;
    if(!this.props.horseInfo.get(String(this.props.horseId))){
      getHorseData(this.props.horseId).then(function(result){
        self.props.getHorseInfo(result)
      })
    }
    if(this.props.isBetting){
      try {
        getBetInfo(this.props.race[0].toNumber()).then((result) => {
          if(self.props.horseNum === 1){
            const max = window.web3.fromWei(result[0], 'ether').toFixed(3);
            const betAmount1 = window.web3.fromWei(result[1], 'ether').toFixed(3);
            const betAmount2 = window.web3.fromWei(result[4], 'ether').toFixed(3);
            self.setState({
              maxBet: max,
              betAmount: betAmount1,
            })
          } else {
            const max = window.web3.fromWei(result[3], 'ether').toFixed(3);
            const betAmount1 = window.web3.fromWei(result[1], 'ether').toFixed(3);
            const betAmount2 = window.web3.fromWei(result[4], 'ether').toFixed(3);
            self.setState({
              maxBet: max,
              betAmount: betAmount2,
            })
          }
        });
      }catch(e){
        self.setState({
           isSomeoneBet: false
        })
      }
      getOdds(this.props.race[0].toNumber()).then((result) => {
        self.setState({
          odds: result[self.props.horseNum-1].toNumber() / 100,
        })
      })
    }
  }

  returnStatus(gene){
    const status = gene.slice(gene.length-15,gene.length);
    return horseStatus(status)
  }

  renderHorse(){
    const {odds} = this.state;
    if(this.props.horseInfo.get(String(this.props.horseId))){
      const horse = this.props.horseInfo.get(String(this.props.horseId));
      const gene = horse[1].c.join(',').replace(/,/g,'');
      return(
          <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
            <p style={raceInfoHorseStyle.horseName}>{horse[2]}</p>
            <HorseImage type={'race-horse'} horseGene={gene}/>
            <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: {this.returnStatus(gene).powerTotal}</p>
            <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: {odds !== 0 ? odds : '？？？'}</p>
          </div>
      )
    } else if(this.props.horseId === 0){
      return(
          <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
            <p style={raceInfoHorseStyle.horseName}>???</p>
            <HorseImage type={'race-horse'} horseGene={'00000000'}/>
            <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: ???</p>
            <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: ？？？</p>
          </div>
      )
    } else {
      return (
          <img
              src={loadingGif}
              width="250px"
              height="250px"
          />)
    }
  }
  onChangeBetNum(e){
    this.setState({
      betNum: e.target.value
    })
  }
  upBetNum(){
    const betNum = this.state.betNum;
    this.setState({
      betNum: (betNum*100 + 1) / 100
    })
  }
  downBetNum(){
    if(this.state.betNum > 0.01){
      const betNum = this.state.betNum;
      this.setState({
        betNum: (betNum*100 - 1) / 100
      })
    }
  }
  render(){
    const horseId = this.props.horseId;
    const raceId = this.props.race[0].toNumber();
    return(
        <div style={raceInfoHorseStyle.container}>
          <div style={raceInfoHorseStyle.horseNum}>horse No.{this.props.horseNum}</div>
          {this.renderHorse()}
          <div style={raceInfoHorseStyle.bettingInfo}>
            <div style={raceInfoHorseStyle.bettingGage}><span style={{
              background: 'linear-gradient(90deg, blue, yellow)',
              width: `${Math.ceil((Number(this.state.betAmount) / (Number(this.state.maxBet) + Number(this.state.betAmount))) * 100) + '%'}`,
              height: '100%',
              position: 'absolute',
              zIndex: 2
            }}></span></div>
            <div style={raceInfoHorseStyle.currentTotalBet}>now {this.state.betAmount} ETH Bet
              <span style={raceInfoHorseStyle.currentMaxBet}> {this.state.maxBet} ETH Remaining</span>
            </div>
          </div>
          <div style={raceInfoHorseStyle.betAction}>
            <button
                style={raceInfoHorseStyle.changeBetNumButton}
                onClick={()=>this.downBetNum()}
            >◀︎
            </button>
            <input
                type="number"
                step="0.01"
                value={this.state.betNum}
                style={raceInfoHorseStyle.inputBetNum}
                onChange={e => this.onChangeBetNum(e)}
                min="0.01"
            />
            <button
                style={raceInfoHorseStyle.changeBetNumButton}
                onClick={()=>this.upBetNum()}
            >▶︎</button>&nbsp;
            ETH
            <button style={raceInfoHorseStyle.betButton} className='bet-button' onClick={()=>betRace(horseId,raceId,this.state.betNum)}>
              bet
            </button>
          </div>
        </div>
    )
  }
}

export default RaceInfoHorse
