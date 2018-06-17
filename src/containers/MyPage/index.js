import React, { Component } from 'react'
import {
  selectMyPageCurrentDisp,
  selectBalance,
  selectActivity,
  selectTicketNum,
  selectHorseArrayLoading,
  selectHorseIdArray,
  selectHorseIdToHorseInfo
} from "./selectors";
import {
  changeCurrentDisplay,
  startLoadMyHorseArray
} from "./actions";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import MyPageHorses from '../MyPage-horses'
import MyPageActivity from '../MyPage-activities'
import MyPageStatus from '../MyPage-status'
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";

class MyPage extends Component {
  componentDidMount(){
    const self = this;
    if(!this.props.myHorseIdsLoaded){
      self.props.startGetMyHorses()
    }
  }
  render(){
    if(this.props.myHorseIdsLoaded){
      switch(this.props.currentDisplay){
        case 'status':
          return <MyPageStatus
              balance={String(this.props.balance)}
              changeDisplay={this.props.changeDisplay}
              activities={this.props.activity.toArray()}
              ticketNum={this.props.ticketNum.toNumber()}
              ownedHorses={this.props.myHorseIds.toArray()}
              horseIdToInfo={this.props.horseIdToInfo}
          />;
        case 'my-horses':
          return <MyPageHorses/>;
        case 'activity':
          return <MyPageActivity/>;
        default:
          return null
      }
    } else {
      return null
    }
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentDisplay: selectMyPageCurrentDisp(),
  balance: selectBalance(),
  activity: selectActivity(),
  ticketNum: selectTicketNum(),
  myHorseIdsLoaded: selectHorseArrayLoading(),
  myHorseIds: selectHorseIdArray(),
  horseIdToInfo: selectHorseIdToHorseInfo()
});
const mapDispatchToProps = (dispatch) => ({
  changeDisplay: (page) => dispatch(changeCurrentDisplay(page)),
  startGetMyHorses: (array) => dispatch(startLoadMyHorseArray(array))
});
const withSaga = injectSaga({ key: 'my-page',saga});
const withConnect = connect(mapStateToProps,mapDispatchToProps);
export default compose(
    withSaga,
    withConnect
)(MyPage)
