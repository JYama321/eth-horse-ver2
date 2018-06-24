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
  selectHorseInfo,
  selectRaceCurrentDisp,
  selectMyRaeArray,
  selectMyHorseIdArray
} from "./selectors";
import {hostRace, getHorseData} from "../../utils/eth-function";
import ApplyRaceModal from '../../components/ModalApplyRace'
import HostRaceModal from '../../components/ModalHostRace'
import Modal from 'react-modal'

Modal.setAppElement('#root');

class Races extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 10,
      isHostRaceModalOpen: false,
      bettingDuration:0,
      prizeRate: 0,
      minWinnerPrize: 0,
      deposit: 0,
      isApplyRaceModalOpen: false,
      currentSelectedRaceId: 0,

    };
    this.onChangePage = this.onChangePage.bind(this);
    this.openApplyRaceModal = this.openApplyRaceModal.bind(this);
    this.openHostRaceModal = this.openHostRaceModal.bind(this);
    this.closeHostRaceModal = this.closeHostRaceModal.bind(this)
  }

  componentDidMount(){
    const self = this;
    if(!this.props.raceArrayLoaded){
      this.props.startLoadRaces();
    }
    //my horse の先頭3匹は取得しておく
    this.props.ownedHorses.toArray().slice(0,3).forEach(function(elem,index){
      getHorseData(elem.toNumber()).then((elem) => {
        self.props.getHorse(elem)
      })
    })
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

  currentState(index){
    const wantedArray = this.props.wantedRaceArray;
    const bettingArray = this.props.bettingRaceArray;
    const checkedArray = this.props.checkedRaceArray;
    if(wantedArray[index]){
      return 'now wanted'
    }else if(bettingArray[index]){
      return 'now betting'
    }else if(checkedArray[index]){
      return 'ended'
    }else{
      return 'calculate odds'
    }
  }
  renderRaces(){
    const self = this;
    switch(this.props.currentDisplay){
      case 'now-wanted':
        const wantedArray = this.props.wantedRaceArray ? this.props.wantedRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
        return wantedArray.map((elem,index) => {
          const race = self.props.raceIdToRaceInfo.get(String(index+1 + (self.state.currentPage-1) * 4)) ? self.props.raceIdToRaceInfo.get(String(index+1)) : null;
          if(race && elem){
            return (
                <RaceCard
                    getHorse={self.props.getHorse}
                    horseInfo={this.props.horseIdToInfo}
                    currentState='now wanted'
                    isMyRace={false}
                    race={race}
                    openApplyRaceModal={this.openApplyRaceModal}
                    key={'race'+index}
                />
            )
          }else if(elem){
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
          }else{
            return null
          }
        });
      case 'now-betting':
        const bettingArray = this.props.bettingRaceArray ? this.props.bettingRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
        return bettingArray.map((elem,index) => {
          const race = self.props.raceIdToRaceInfo.get(String(index + 1 + (self.state.currentPage-1) * 4)) ? self.props.raceIdToRaceInfo.get(String(index+1)) : null;
          if(race && elem){
            return (
                <RaceCard
                    getHorse={self.props.getHorse}
                    horseInfo={this.props.horseIdToInfo}
                    currentState='now betting'
                    isBetting={true}
                    race={race}
                    key={'race'+index}
                />
            )
          }else if (elem){
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
          }else{
            return null
          }
        });
      case 'ended':
        const checkedArray = this.props.checkedRaceArray ? this.props.checkedRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
        return checkedArray.map((elem,index) => {
          const race = self.props.raceIdToRaceInfo.get(String(index + 1 + (self.state.currentPage-1) * 4)) ? self.props.raceIdToRaceInfo.get(String(index+1)) : null;
          if(race && elem){
            return (
                <RaceCard
                    getHorse={self.props.getHorse}
                    horseInfo={this.props.horseIdToInfo}
                    currentState='ended'
                    race={race}
                    key={'race'+index}
                />
            )
          }else if (elem) {
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
          } else {
            return null
          }
        });
      case 'my-races':
        const myRaceArray = this.props.myRaceArray ? this.props.myRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
        return myRaceArray.map((elem,index) => {
          const race = self.props.raceIdToRaceInfo.get(String(index+1 + (self.state.currentPage-1) * 4)) ? self.props.raceIdToRaceInfo.get(String(index+1)) : null;
          if(race && elem){
            return (
                <RaceCard
                    getHorse={self.props.getHorse}
                    horseInfo={this.props.horseIdToInfo}
                    race={race}
                    currentState={self.currentState(elem.toNumber()-1)}
                    openApplyRaceModal={this.openApplyRaceModal}
                    isMyRace={true}
                    key={'race'+index}
                />
            )
          }else if (elem) {
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
          } else {
            return null
          }
        });
      default:
        return null
    }
  }
  openHostRaceModal(){
    this.setState({
      isHostRaceModalOpen: true
    })
  }
  closeHostRaceModal(){
    this.setState({
      isHostRaceModalOpen: false
    })
  }
  openApplyRaceModal(num){
    this.setState({
      isApplyRaceModalOpen: true,
      currentSelectedRaceId: num
    })
  }
  closeApplyRaceModal(){
    this.setState({
      isApplyRaceModalOpen: false
    })
  }
  render () {
    return(
        <div style={racePageStyles.outerContainer}>
          <div style={racePageStyles.innerContainer}>
            <HostRaceModal closeModal={this.closeHostRaceModal} isActive={this.state.isHostRaceModalOpen}/>
            <ApplyRaceModal
                isActive={this.state.isApplyRaceModalOpen} ownedHorses={this.props.ownedHorses.toArray()}
                horseInfo={this.props.horseIdToInfo} closeModal={()=>this.closeApplyRaceModal()} raceId={this.state.currentSelectedRaceId}
            />
            <div style={racePageStyles.headerBottom}>
              <button style={racePageStyles.holdRaceButton} onClick={()=>this.openHostRaceModal()}>Hold Race +</button>
            </div>
            {this.renderRaces()}
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

const mapStateToProps = (state) => createStructuredSelector({
  raceNum: selectAllRaceArray(),
  raceArrayLoaded: selectAllRaceArrayLoaded(),
  raceIdToRaceInfo: selectRaceInfo(),
  wantedRaceArray: selectWantedRaceArray(),
  bettingRaceArray: selectBettingRaceArray(),
  checkedRaceArray: selectCheckedRaceArray(),
  horseIdToInfo: selectHorseInfo(),
  currentDisplay: selectRaceCurrentDisp(),
  myRaceArray: selectMyRaeArray(),
  ownedHorses: selectMyHorseIdArray()
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
