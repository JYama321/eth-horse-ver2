import React, { Component } from 'react'
import { raceInfoStyle } from "./styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  selectRaceInfo,
  selectHorseInfo,
  selectWantedRaceArray,
  selectBettingRaceArray,
  selectCheckedRaceArray
} from "./selectors";
import {
  getRace
} from "../../utils/eth-function";
import {
  getRaceInfo,
  getHorseInfo
} from "./actions";
import RaceInfoHorse from '../../components/RaceInfoHorse'
const loadingGif = require('../../assets/static_assets/umaloading.gif');

class RaceInfo extends Component {
  componentDidMount(){
    const self = this;
    if(!this.props.raceInfo.get(this.props.match.params.id)){
      const raceIndex = Number(this.props.match.params.id) - 1;
      getRace(raceIndex).then((result) => {
        self.props.getRaceInfo(result)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  render(){
    const raceId = this.props.match.params.id;
    const isWanted = this.props.wantedRaces[Number(raceId)-1];
    const isBetting = this.props.bettingRaces[Number(raceId)-1];
    const isChecked = this.props.checkedRaces[Number(raceId)-1];
    if(this.props.raceInfo.get(raceId)){
      const race = this.props.raceInfo.get(raceId);
      return(
          <div style={raceInfoStyle.outerContainer}>
            <div style={raceInfoStyle.innerContainer}>
              <div style={raceInfoStyle.raceName}>
                Race Name Here
              </div>
              <div style={raceInfoStyle.winnerPrize}>
                Winner Prize&nbsp;
                {window.web3.fromWei(race[6],'ether').toNumber().toFixed(2)} ETH + {race[7].toNumber()} % of total bet
              </div>
              <div style={raceInfoStyle.remainTime}>
                remainingTime&nbsp;{race[5].toNumber()}  seconds
              </div>
              <div style={raceInfoStyle.appliedHorseContainer}>
                <RaceInfoHorse
                    horseInfo={this.props.horseInfo} horseId={race[2].toNumber()} horseNum={1} getHorseInfo={this.props.getHorseInfo}
                    race={race} isBetting={isBetting} isWanted={isWanted}
                    isChecked={isChecked}
                />
                <RaceInfoHorse
                    horseInfo={this.props.horseInfo} horseId={race[3].toNumber()} horseNum={2} getHorseInfo={this.props.getHorseInfo}
                    race={race}  isWanted={isWanted} isBetting={isBetting} isChecked={isChecked}
                />
              </div>
            </div>
          </div>
      )
    } else {
      return(
          <div style={raceInfoStyle.outerContainer}>
            <div style={raceInfoStyle.innerContainer}>
            <img
                src={loadingGif}
                width="250px"
                height="250px"
            />
            </div>
          </div>
      )
    }
  }
}

const mapStateToProps = () => createStructuredSelector({
  raceInfo: selectRaceInfo(),
  horseInfo: selectHorseInfo(),
  wantedRaces: selectWantedRaceArray(),
  bettingRaces: selectBettingRaceArray(),
  checkedRaces: selectCheckedRaceArray()
});

const mapDispatchToProps = (dispatch) => ({
  getRaceInfo: (race) => dispatch(getRaceInfo(race)),
  getHorseInfo: (horse) => dispatch(getHorseInfo(horse)),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);


export default connect(mapStateToProps,mapDispatchToProps)(RaceInfo)
