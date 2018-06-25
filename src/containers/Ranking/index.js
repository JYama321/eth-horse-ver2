import React, {Component} from 'react'
import {styles} from './styles'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getHorseInfoSuccess
} from './actions'
import {
  selectHorseGeneArray,
  selectHorseGeneArrayLoading,
  selectHorseIdToHorseInfo,
  selectRankTotalPrizeArray,
  selectRankWinCountArray,
} from "./selectors";
import HorseRankStatusCard from '../../components/HorseRankStatusCard'
import loadingGif from '../../assets/static_assets/umaloading.gif'
import {getHorseData} from "../../utils/eth-function";
import { horseStatus } from "../../utils/functions";

class Ranking extends Component{
  renderGeneRankHorses(){
    const self = this;
    const array = this.props.horseGeneArray ? this.props.horseGeneArray.map((elem,index) => {
      const gene = elem.c.join(',').replace(/,/g,'');
      const slicedGene = gene.slice(gene.length - 15, gene.length);
      return {
        strength: horseStatus(slicedGene).powerTotal,
        id: index + 1
      }
    }).sort((a,b) => {
      if(a.strength < b.strength){
        return 1;
      }else if(a.strength > b.strength){
        return -1;
      }else{
        return 0
      }
    }).slice(0,4) : [];
    return array.map(function (elem,index) {
      const isLeft = index % 4 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.id)) ? self.props.horseIdToInfo.get(String(elem.id)) : null;
      if(horse){
        return (
            <HorseRankStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
                key={'rank-'+index}
                rank={index+1}
                number={elem.strength}
                type='strength'
            />
        )
      }else{
        getHorseData(elem.id).then(horse => self.props.getHorse(horse));
        return(
            <b key={'loading-'+index}>Loading{elem.id}</b>
        )
      }
    })
  }

  renderTotalPrizeRankHorses(){
    const self = this;
    const array = this.props.totalPrizeArray ? this.props.totalPrizeArray.map((elem,index) => {
      return {
        price: elem.toNumber(),
        id: index + 1
      }
    }).sort((a,b) => {
      if(a.price < b.price) {
        return 1
      } else if(a.price > b.price) {
        return -1
      } else {
        return 0
      }
    }).slice(0,4) : [];
    return array.map(function (elem,index) {
      const isLeft = index % 4 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.id)) ? self.props.horseIdToInfo.get(String(elem.id)) : null;
      if(horse){
        return (
            <HorseRankStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
                key={'rank-'+index}
                rank={index+1}
                number={elem.price}
                type='total-prize'
            />
        )
      }else{
        getHorseData(elem.id).then(horse => self.props.getHorse(horse));
        return(
            <img
                key={'loading-'+index}
                width="250px"
                height="250px"
                src={loadingGif}
            />
        )
      }
    })
  }
  renderWinCountRankHorses(){
    const self = this;
    const array = this.props.winCountArray ? this.props.winCountArray.map((elem,index) => {
      return {
        winCount: elem.toNumber(),
        id: index + 1
      }
    }).sort((a,b) => {
      if(a.winCount < b.winCount) {
        return 1
      }else if(a.winCount > b.winCount){
        return -1
      } else {
        return 0
      }
    }).slice(0,4) : [];
    return array.map(function (elem,index) {
      const isLeft = index % 4 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.id)) ? self.props.horseIdToInfo.get(String(elem.id)) : null;
      if(horse){
        return (
            <HorseRankStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
                key={'rank-'+index}
                rank={index+1}
                number={elem.winCount}
                type='win-count'
            />
        )
      }else{
        getHorseData(elem.id).then(horse => self.props.getHorse(horse));
        return(
            <img
                key={'loading-'+index}
                width="250px"
                height="250px"
                src={loadingGif}
            />
        )
      }
    })
  }

  render(){
    return(
        <div style={styles.outerContainer}>
          <div style={styles.innerContainer}>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>TotalPrize</div>
              {this.renderGeneRankHorses()}
            </div>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>Win Counts</div>
              {this.renderWinCountRankHorses()}
            </div>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>Strength</div>
              {this.renderTotalPrizeRankHorses()}
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  geneArrayLoading: selectHorseGeneArrayLoading(),
  horseGeneArray: selectHorseGeneArray(),
  horseIdToInfo: selectHorseIdToHorseInfo(),
  totalPrizeArray: selectRankTotalPrizeArray(),
  winCountArray: selectRankWinCountArray(),
});
const mapDispatchToProps = (dispatch) => ({
  getHorse: horse => dispatch(getHorseInfoSuccess(horse))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default withConnect(Ranking);
