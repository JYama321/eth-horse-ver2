import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HorseImage from '../HorseImage'
import { raceInfoHorseStyle } from "./styles";
import {
  getHorseData,
  getBetInfo
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
    isChecked: PropTypes.bool.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      betNum: 0.00
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
      getBetInfo(this.props.raceId).then((result) => {
        console.log(result)
      })
    }
  }

  returnStatus(gene){
    const status = gene.slice(gene.length-15,gene.length);
    return horseStatus(status)
  }

  renderHorse(){
    if(this.props.horseInfo.get(String(this.props.horseId))){
      const horse = this.props.horseInfo.get(String(this.props.horseId));
      const gene = horse[1].c.join(',').replace(/,/g,'');
      return(
          <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
            <p style={raceInfoHorseStyle.horseName}>{horse[2]}</p>
            <HorseImage type={'race-horse'} horseGene={gene}/>
            <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: {this.returnStatus(gene).powerTotal}</p>
            <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: ???</p>
          </div>
      )
    } else if(this.props.horseId === 0){
      return(
          <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
            <p style={raceInfoHorseStyle.horseName}>???</p>
            <HorseImage type={'race-horse'} horseGene={'00000000'}/>
            <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: ???</p>
            <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: ???</p>
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
    this.setState({
      betNum: this.state.betNum + 0.01
    })
  }
  downBetNum(){
    if(this.state.betNum > 0){
      this.setState({
        betNum: this.state.betNum - 0.01
      })
    }
  }
  render(){
    return(
        <div style={raceInfoHorseStyle.container}>
          <div style={raceInfoHorseStyle.horseNum}>horse No.{this.props.horseNum}</div>
          {this.renderHorse()}
          <div style={raceInfoHorseStyle.bettingInfo}>
            <div style={raceInfoHorseStyle.bettingGage}><span></span></div>
            <div style={raceInfoHorseStyle.currentTotalBet}>now total bet 85 ETH</div>
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
            />
            <button
                style={raceInfoHorseStyle.changeBetNumButton}
                onClick={()=>this.upBetNum()}
            >▶︎</button>&nbsp;
            ETH
            <button style={raceInfoHorseStyle.betButton} className='bet-button'>
              bet
            </button>
          </div>
        </div>
    )
  }
}

export default RaceInfoHorse
