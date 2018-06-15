import React, { Component } from 'react'
import HorseImage from '../../components/HorseImage'
import PropTypes from 'prop-types'
import { raceCardStyles } from "./styles";
import {
  getHorseData
} from "../../utils/eth-function";


class RaceCard extends Component{
  static propTypes = {
    race: PropTypes.array,
    getHorse: PropTypes.func,
    horseInfo: PropTypes.object
  };
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
  render(){
    return(
        <div style={raceCardStyles.cardContainer}>
          <div style={raceCardStyles.cartContainerTop}>
            <p>2018.04.15</p>
          </div>
          <div style={raceCardStyles.raceInfoContainer}>
            <p style={raceCardStyles.raceNameP}>Race Name Here</p>
            <p style={raceCardStyles.winnerPrizeP}>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)} ETH + {this.props.race[7].toNumber()} % of total bet</p>
            <p style={raceCardStyles.remainTimeP}>Betting Duration{this.props.race[5].toNumber()}  seconds</p>
            <div style={raceCardStyles.currentState} className='race-current-state'>now betting</div>
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


export default RaceCard

