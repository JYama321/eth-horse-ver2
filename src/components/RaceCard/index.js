import React, { Component } from 'react'
import HorseImage from '../../components/HorseImage'
import PropTypes from 'prop-types'
import { raceCardStyles } from "./styles";
import {
  getHorseData,
  getRaceStartTime,
  checkResult
} from "../../utils/eth-function";
import { Link } from 'react-router-dom'
import BookMakeModal from '../Modal-bookmake'


class RaceCard extends Component{
  static propTypes = {
    race: PropTypes.array,
    getHorse: PropTypes.func,
    horseInfo: PropTypes.object,
    currentState: PropTypes.string,
    isMyRace: PropTypes.bool,
    openApplyRaceModal: PropTypes.func,
    isBetting: PropTypes.bool
  };
  constructor(props){
    super(props);
    this.state={
      isBookMakeModalOpen: false,
      startTime: '',
      dateNumber: 0
    };
    this.closeBookMakeModal = this.closeBookMakeModal.bind(this)
  }
  async componentDidMount(){
    const self = this;
    if(this.props.race[2].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[2].toNumber()))){
      const horseOne = await getHorseData(this.props.race[2].toNumber());
      await this.props.getHorse(horseOne);
    }
    if(this.props.race[3].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[3].toNumber()))) {
      const horseTwo = await getHorseData(this.props.race[3].toNumber());
      await this.props.getHorse(horseTwo);
    }
    if(this.props.isBetting){
      getRaceStartTime(this.props.race[0].toNumber()).then((result) => {
        const date = new Date(result.toNumber() * 1000);
        const month = '0' + (date.getMonth() + 1);
        const day = '0'+date.getDate();
        const hours = '0' + date.getHours();
        const minutes = '0' + date.getMinutes();
        self.setState({
          startTime: date.getFullYear() + '/' + month.slice(month.length - 2,month.length) + '/' +
          day.slice(day.length - 2,day.length) + '/' + hours.slice(hours.length-2,hours.length) + ':' + minutes.slice(minutes.length-2,minutes.length),
          dateNumber: result.toNumber()
         });
      })
    }
  }
  openBookMakeModal(){
    this.setState({
      isBookMakeModalOpen: true
    })
  }
  closeBookMakeModal(){
    this.setState({
      isBookMakeModalOpen: false
    })
  }

  renderCurrentStateButton(state){
    const raceId = this.props.race[0].toNumber();
    switch(state){
      case 'now wanted':
        return <button style={raceCardStyles.currentState} className='race-current-state' onClick={()=>this.props.openApplyRaceModal(raceId)}>Apply Race</button>;
      case 'now betting':
        return <button style={raceCardStyles.currentState} className='race-current-state'>now betting</button>;
      case 'ended':
        return <button style={raceCardStyles.currentState} className='race-current-state'>ended</button>;
      case 'calculate odds':
        return <button style={raceCardStyles.currentState} className='race-current-state' onClick={()=>this.openBookMakeModal()}>decide odds</button>;
      case 'check result':
        return <button style={raceCardStyles.currentState} className='race-current-state' onClick={() => checkResult(raceId)}>Check Result</button>
      default:
        return null;
    }
  }
  render(){
    const startTime = this.props.isBetting ? this.state.startTime : '？？？';
    const currentState = new Date(this.state.dateNumber * 1000) < new Date(Date.now()) && this.props.isBetting ? 'check result' : this.props.currentState
    if(this.props.isMyRace){
      return(
          <div style={raceCardStyles.cardContainer}>
            <BookMakeModal
                isModalOpen={this.state.isBookMakeModalOpen}
                closeModal={this.closeBookMakeModal}
                race={this.props.race}
                horseInfo={this.props.horseInfo}
            />
            <div style={raceCardStyles.cartContainerTop}>
              <p>Start from: {startTime}</p>
            </div>
            <div style={raceCardStyles.raceInfoContainer}>
              <Link to={'/races/' + this.props.race[0].toNumber()}><p style={raceCardStyles.raceNameP}>{this.props.race[5]}</p></Link>
              <p style={raceCardStyles.winnerPrizeP}>Winner Prize:&nbsp; <b>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)}</b> ETH + <b>{this.props.race[7].toNumber()}</b> % of total bet</p>
              {this.renderCurrentStateButton(currentState)}
            </div>
            <div style={raceCardStyles.horseImgContainer}>
              <div style={raceCardStyles.horseContainer}>
                <div className='horse-back' style={raceCardStyles.horseBack}>
                  <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[1].c.join(',').replace(/,/g,'') : '0000000'}/>
                </div>
                <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[2] : '???'}</p>
              </div>
              <div style={raceCardStyles.horseContainer}>
                <div className='horse-back' style={raceCardStyles.horseBack}>
                  <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[1].c.join(',').replace(/,/g,'') : '000000'}/>
                </div>
                <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[2] : '???'}</p>
              </div>
            </div>
          </div>
      )
    }else{
      return(
          <div style={raceCardStyles.cardContainer}>
            <div style={raceCardStyles.cartContainerTop}>
              <p>Start from: {startTime}</p>
            </div>
            <div style={raceCardStyles.raceInfoContainer}>
              <Link to={'/races/' + this.props.race[0].toNumber()}><p style={raceCardStyles.raceNameP}>{this.props.race[5]}</p></Link>
              <p style={raceCardStyles.winnerPrizeP}>Winner Prize:&nbsp;<b>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)}</b> ETH + <b>{this.props.race[7].toNumber()}</b> % of total bet</p>
              {this.renderCurrentStateButton(this.props.currentState)}
            </div>
            <div style={raceCardStyles.horseImgContainer}>
              <div style={raceCardStyles.horseContainer}>
                <div className='horse-back' style={raceCardStyles.horseBack}>
                  <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[1].c.join(',').replace(/,/g,'') : '0000000'}/>
                </div>
                <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[2] : '???'}</p>
              </div>
              <div style={raceCardStyles.horseContainer}>
                <div className='horse-back' style={raceCardStyles.horseBack}>
                  <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[1].c.join(',').replace(/,/g,'') : '000000'}/>
                </div>
                <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[2] : '???'}</p>
              </div>
            </div>
          </div>
      )
    }
  }
}


export default RaceCard

