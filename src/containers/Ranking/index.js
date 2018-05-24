import React, {Component} from 'react'
import {styles} from './styles'
import injectSaga from '../../utils/injectSaga'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  startLoadHorseGeneArray,
  moveGeneRankPage,
  startLoadHorseTotalPrizeArray,
  moveTotalPrizeRankPage,
  startLoadHorseWinCountArray,
  moveWinCountRankPage
} from './actions'
import saga from './saga'
import {
  selectHorseGeneArray,
  selectHorseGeneArrayLoading,
  selectHorseIdToHorseInfo,
  selectRankTotalPrizeArray,
  selectRankTotalPrizeArrayLoading,
  selectRankWinCountArray,
  selectRankWinCountArrayLoading,
  selectRankGeneCurrentPage,
  selectRankTotalPrizeCurrentPage,
  selectRankWinCountCurrentPage
} from "./selectors";
import HorseRankStatusCard from '../../components/HorseRankStatusCard'
import Pagination from '../../components/Pagination'
import ControlledOpenSelect from '../../components/RankTypeMenu'

class Ranking extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 10,
      rankType: 'gene',
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRankType = this.onChangeRankType.bind(this)
  }

  componentDidMount(){
    this.props.geneArrayLoadStart();
    this.props.totalPrizeRankArrayLoadStart();
    this.props.winCountRankArrayLoadStart();
  }

  onChangeRankType(e){
    this.setState({
      rankType: e.target.value,
    },function(){
      switch(e.target.value){
        case 'gene':
          this.setState({
            currentPage: this.props.geneCurrentPage
          });
          break;
        case 'winCount':
          this.setState({
            currentPage: this.props.winCountCurrentPage
          });
          break;
        case 'prize':
          this.setState({
            currentPage: this.props.prizeCurrentPage
          });
          break;
        default:
          return;
      }
    })
  }

  componentWillReceiveProps(props,state){
    if(this.state.totalPage !== Math.ceil(props.horseGeneArray.toArray().length / 8)){
      this.setState({
        totalPage: Math.ceil(props.horseGeneArray.toArray().length / 8)
      })
    }
  }

  renderGeneRankHorses(){
    const self = this;
    const array = this.props.horseGeneArray ? this.props.horseGeneArray.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
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
                rank={index+1+(self.state.currentPage-1)*8}
            />
        )
      }else{
        return(
            <b key={'loading-'+index}>Loading{elem.id}</b>
        )
      }
    })
  }

  renderTotalPrizeRankHorses(){
    const self = this;
    const array = this.props.totalPrizeArray ? this.props.totalPrizeArray.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
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
                rank={index+1+(self.state.currentPage-1)*8}
            />
        )
      }else{
        return(
            <h1 key={'loading-'+index}>Loading{elem.id}</h1>
        )
      }
    })
  }
  renderWinCountRankHorses(){
    const self = this;
    const array = this.props.winCountArray ? this.props.winCountArray.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
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
                rank={index+1+(self.state.currentPage-1)*8}
            />
        )
      }else{
        return(
            <h1 key={'loading-'+index}>Loading{elem.id}</h1>
        )
      }
    })
  }

  onChangePage(currentPage){
    this.setState({
      currentPage: currentPage
    },function(){
      this.props.moveGeneRanKPage(currentPage)
    })
  }

  render(){
    if(this.state.rankType === 'gene'){
      if(!this.props.geneArrayLoading){
        return(
            <div style={styles.outerContainer}>
              <ControlledOpenSelect
                  handleChange={this.onChangeRankType}
                  value={this.state.rankType}
              />
              <div style={styles.innerContainer}>
                {this.renderGeneRankHorses()}
                <Pagination
                    totalPage={this.state.totalPage}
                    currentPage={this.state.currentPage}
                    buttonPerPage={this.state.buttonPerPage}
                    onChangePage={this.onChangePage}
                />
              </div>
            </div>
        )
      } else {
        return null
      }
    }else if(this.state.rankType === 'prize'){
      return(
          <div style={styles.outerContainer}>
            <ControlledOpenSelect
                handleChange={this.onChangeRankType}
                value={this.state.rankType}
            />
            <div style={styles.innerContainer}>
              {this.renderTotalPrizeRankHorses()}
              <Pagination
                  totalPage={this.state.totalPage}
                  currentPage={this.state.currentPage}
                  buttonPerPage={this.state.buttonPerPage}
                  onChangePage={this.onChangePage}
              />
            </div>
          </div>
      )
    }else if(this.state.rankType === 'winCount'){
      return(
          <div style={styles.outerContainer}>
            <ControlledOpenSelect
                handleChange={this.onChangeRankType}
                value={this.state.rankType}
            />
            <div style={styles.innerContainer}>
              {this.renderWinCountRankHorses()}
              <Pagination
                  totalPage={this.state.totalPage}
                  currentPage={this.state.currentPage}
                  buttonPerPage={this.state.buttonPerPage}
                  onChangePage={this.onChangePage}
              />
            </div>
          </div>
      )
    }
  }
}

const mapStateToProps = createStructuredSelector({
  geneArrayLoading: selectHorseGeneArrayLoading(),
  horseGeneArray: selectHorseGeneArray(),
  horseIdToInfo: selectHorseIdToHorseInfo(),
  totalPrizeArray: selectRankTotalPrizeArray(),
  prizeArrayLoading: selectRankTotalPrizeArrayLoading(),
  winCountArrayLoading: selectRankWinCountArrayLoading(),
  winCountArray: selectRankWinCountArray(),
  geneCurrentPage: selectRankGeneCurrentPage(),
  prizeCurrentPage: selectRankTotalPrizeCurrentPage(),
  winCountCurrentPage: selectRankWinCountCurrentPage()
});
const mapDispatchToProps = (dispatch) => ({
  geneArrayLoadStart: ()=>dispatch(startLoadHorseGeneArray()),
  moveGeneRanKPage: (page)=>dispatch(moveGeneRankPage(page)),
  totalPrizeRankArrayLoadStart: ()=>dispatch(startLoadHorseTotalPrizeArray()),
  moveTotalPrizeRankPage: (page)=>dispatch(moveTotalPrizeRankPage(page)),
  winCountRankArrayLoadStart: ()=>dispatch(startLoadHorseWinCountArray()),
  moveWinCountRankPage: (page)=>dispatch(moveWinCountRankPage(page))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'genes',saga});

export default compose(
    withSaga,
    withConnect
)(Ranking);
