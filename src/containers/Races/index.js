import React, {Component} from 'react'
import { racePageStyles } from './styles'
import injectSaga from '../../utils/injectSaga'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RaceCard from '../../components/RaceCard'
import Pagination from '../../components/Pagination'
import loadingGif from '../../assets/static_assets/umaloading.gif'
import saga from './saga'
import {
  startLoadRaceArray,
  getHorseInfo,
  changeRacePage
} from "./actions";
import {
  selectRaceInfo,
  selectAllRaceArray,
  selectAllRaceArrayLoaded,
  selectWantedRaceArray,
  selectBettingRaceArray,
  selectCheckedRaceArray,
  selectHorseInfo
} from "./selectors";


class Races extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 10
    };
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount(){
    if(!this.props.raceArrayLoaded){
      this.props.startLoadRaces();
    }
  }
  componentWillReceiveProps(props,state){
    this.setState({
      totalPage: Math.ceil(props.raceNum / 4)
    })
  }

  onChangePage(currentPage){
    this.setState({
      currentPage: currentPage
    },function(){
      this.props.movePage(currentPage)
    })
  }

  renderRaces(){
    const self = this;
    const array = this.props.wantedRaceArray ? this.props.wantedRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
    return array.map((elem,index) => {
      const race = self.props.raceIdToRaceInfo.get(String(index+1)) ? self.props.raceIdToRaceInfo.get(String(index+1)) : null;
      if(race){
        return (
            <RaceCard
                getHorse={self.props.getHorse}
                horseInfo={this.props.horseIdToInfo}
                race={race}
                key={'race'+index}
            />
        )
      }else{
        return(
            <img
                key={'loading-'+index}
                src={loadingGif}
                style={{
                  width: '200px',
                  height: '200px'
                }}
            />
        )
      }
    });
  }
  render () {
    return(
        <div style={racePageStyles.outerContainer}>
          <div style={racePageStyles.innerContainer}>
            {this.renderRaces()}
          </div>
          <Pagination
              totalPage={this.state.totalPage}
              currentPage={this.state.currentPage}
              buttonPerPage={this.state.buttonPerPage}
              onChangePage={this.onChangePage}
          />
        </div>
    )
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  raceNum: selectAllRaceArray(),
  raceArrayLoaded: selectAllRaceArrayLoaded(),
  raceIdToRaceInfo: selectRaceInfo(),
  wantedRaceArray: selectWantedRaceArray(),
  bettingRaceArray: selectBettingRaceArray(),
  checkedRaceArray: selectCheckedRaceArray(),
  horseIdToInfo: selectHorseInfo()
});
const mapDispatchToProps = (dispatch) => ({
  startLoadRaces: () => dispatch(startLoadRaceArray()),
  getHorse: (horse) => dispatch(getHorseInfo(horse)),
  movePage: (page) => dispatch(changeRacePage(page))
});
const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'races-saga',saga});

export default compose(
    withSaga,
    withConnect
)(Races);
