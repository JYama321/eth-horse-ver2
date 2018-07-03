import React, {Component} from 'react'
import { styles, modalStyle} from './styles'
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
import RankingModalHorse from '../../components/RankingModalHorse'
import Modal from 'react-modal'
Modal.setAppElement('#root');


class Ranking extends Component{
  constructor(props){
    super(props);
    this.state={
      isRankingModalOpen: false,
      rankingType: ''
    }
  }
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

  openModal(type){
    this.setState({
      isRankingModalOpen: true,
      rankingType: type
    })
  }
  closeModal(){
    this.setState({
      isRankingModalOpen: false,
      rankingType: ''
    })
  }
  renderRanking(){
    const self = this;
    const prize = this.props.totalPrizeArray;
    switch (this.state.rankingType){
      case 'strength':
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
        }).slice(0,30) : [];
        return array.map((elem,index) => {
          const horse = this.props.horseIdToInfo.get(String(elem.id)) ? this.props.horseIdToInfo.get(String(elem.id)) : null;
          if(horse){
            return <RankingModalHorse horseInfo={horse} totalPrize={prize.get(index).toNumber()} rank={index + 1} key={'modal-rank-horse' + index}/>
          }else {
            getHorseData(elem.id).then(horse => self.props.getHorse(horse));
            return <img
                key={'loading-'+index}
                width="60px"
                height="60px"
                src={loadingGif}
            />
          }
        });
      case 'total-prize':
        const totalPrizeArray = this.props.totalPrizeArray ? this.props.totalPrizeArray.map((elem,index) => {
          return {
            prize: elem.toNumber(),
            id: index + 1
          }
        }).sort((a,b) => {
          if(a.prize < b.prize){
            return 1;
          }else if(a.prize > b.prize){
            return -1;
          }else{
            return 0
          }
        }).slice(0,30) : [];
        return totalPrizeArray.map((elem,index) => {
          const horse = this.props.horseIdToInfo.get(String(elem.id)) ? this.props.horseIdToInfo.get(String(elem.id)) : null;
          if(horse){
            return <RankingModalHorse horseInfo={horse} totalPrize={elem.prize} rank={index + 1} key={'modal-rank-horse' + index}/>
          }else {
            return <img
                width="60px"
                height="60px"
                src={loadingGif}
            />
          }
        });
      case 'win-count':
        const winCountArray = this.props.winCountArray ? this.props.winCountArray.map((elem,index) => {
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
        }).slice(0,30) : [];
        return winCountArray.map((elem,index) => {
          const horse = this.props.horseIdToInfo.get(String(elem.id)) ? this.props.horseIdToInfo.get(String(elem.id)) : null;
          if(horse){
            return <RankingModalHorse horseInfo={horse} totalPrize={prize.get(index).toNumber()} rank={index + 1} key={'modal-rank-horse' + index}/>
          }else{
            getHorseData(elem.id).then(horse => self.props.getHorse(horse));
            return(<img
                width="60px"
                height="60px"
                src={loadingGif}
            />
            )
          }
        });
      default:
        return null
    }
  }
  render(){
    return(
        <div style={styles.outerContainer}>
          <Modal
              isOpen={this.state.isRankingModalOpen}
              style={modalStyle}
              onRequestClose={()=>this.closeModal()}
              contentLabel={'Ranking'}
          >
            <div style={styles.modalContent}>
              <div style={styles.modalTitle}>
                Ranking
              </div>
              <div style={styles.modalTopLabels}>
                <div style={styles.modalTopLabelContainer}>
                  <div style={styles.topLabelWinCount}>
                    win count
                  </div>
                  <div style={styles.topLabelTotalPrize}>
                    total prize
                  </div>
                  <div style={styles.topLabelRarity}>
                    rarity
                  </div>
                  <div style={styles.topLabelPowerTotal}>
                    power total
                  </div>
                </div>
              </div>
              <div style={styles.modalRankContents}>
                { this.renderRanking() }
              </div>
            </div>
          </Modal>
          <div style={styles.innerContainer}>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>Strength<button style={styles.showMore} onClick={()=>this.openModal('strength')}>Show More ></button></div>
              { this.renderGeneRankHorses() }
            </div>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>Win Counts<button style={styles.showMore} onClick={()=>this.openModal('win-count')}>Show More ></button></div>
              { this.renderWinCountRankHorses() }
            </div>
            <div style={styles.rankingContainer}>
              <div style={styles.rankTitle}>TotalPrize<button style={styles.showMore} onClick={()=>this.openModal('total-prize')}>Show More ></button></div>
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
