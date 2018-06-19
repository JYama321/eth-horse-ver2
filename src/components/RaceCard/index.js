import React, { Component } from 'react'
import HorseImage from '../../components/HorseImage'
import PropTypes from 'prop-types'
import { raceCardStyles } from "./styles";
import {
  getHorseData,
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
    openApplyRaceModal: PropTypes.func
  };
  constructor(props){
    super(props);
    this.state={
      isModalOpen: false
    };
    this.closeModal = this.closeModal.bind(this)
  }
  async componentDidMount(){
    if(this.props.race[2].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[2].toNumber()))){
      const horseOne = await getHorseData(this.props.race[2].toNumber());
      await this.props.getHorse(horseOne);
    }
    if(this.props.race[3].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[3].toNumber()))) {
      const horseTwo = await getHorseData(this.props.race[3].toNumber());
      await this.props.getHorse(horseTwo);
    }
  }
  openModal(){
    this.setState({
      isModalOpen: true
    })
  }
  closeModal(){
    this.setState({
      isModalOpen: false
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
        return <button style={raceCardStyles.currentState} className='race-current-state'>calculating odds</button>;
      default:
        return null;
    }
  }
  render(){
    if(this.props.isMyRace){
      return(
          <div style={raceCardStyles.cardContainer}>
            <BookMakeModal
                isModalOpen={this.state.isModalOpen}
                closeModal={this.closeModal}

            />
            <div style={raceCardStyles.cartContainerTop}>
              <p>2018.04.15</p>
            </div>
            <div style={raceCardStyles.raceInfoContainer}>
              <Link to={'/races/' + this.props.race[0].toNumber()}><p style={raceCardStyles.raceNameP}>Race Name Here</p></Link>
              <p style={raceCardStyles.winnerPrizeP}>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)} ETH + {this.props.race[7].toNumber()} % of total bet</p>
              <p style={raceCardStyles.remainTimeP}>Betting Duration{this.props.race[5].toNumber()}  seconds</p>
              <button style={raceCardStyles.currentState} className='race-current-state'>{this.props.currentState}</button>
              <button onClick={()=>this.openModal()}>decide bet rate</button>
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
              <p>2018.04.15</p>
            </div>
            <div style={raceCardStyles.raceInfoContainer}>
              <Link to={'/races/' + this.props.race[0].toNumber()}><p style={raceCardStyles.raceNameP}>Race Name Here</p></Link>
              <p style={raceCardStyles.winnerPrizeP}>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)} ETH + {this.props.race[7].toNumber()} % of total bet</p>
              <p style={raceCardStyles.remainTimeP}>Betting Duration{this.props.race[5].toNumber()}  seconds</p>
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

