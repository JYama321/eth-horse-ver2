import React, { Component } from 'react'
import {
  selectMyPageCurrentDisp,
  selectBalance,
  selectActivity,
  selectTicketNum
} from "./selectors";
import {
  changeCurrentDisplay
} from "./actions";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import MyPageHorses from '../MyPage-horses'
import MyPageActivity from '../MyPage-activities'
import MyPageStatus from '../MyPage-status'

class MyPage extends Component {
  render(){
    const self = this;
    switch(this.props.currentDisplay){
      case 'status':
        return <MyPageStatus
            balance={String(self.props.balance)}
            changeDisplay={this.props.changeDisplay}
            activities={this.props.activity.toArray()}
            ticketNum={this.props.ticketNum.toNumber()}
        />;
      case 'my-horses':
        return <MyPageHorses/>;
      case 'activity':
        return <MyPageActivity/>;
      default:
        return null
    }
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentDisplay: selectMyPageCurrentDisp(),
  balance: selectBalance(),
  activity: selectActivity(),
  ticketNum: selectTicketNum()
});
const mapDispatchToProps = (dispatch) => ({
  changeDisplay: (page) => dispatch(changeCurrentDisplay(page))
});

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)
