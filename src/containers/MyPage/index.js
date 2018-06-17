import React, { Component } from 'react'
import {
  selectMyPageCurrentDisp,
  selectBalance
} from "./selectors";
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
            balance={self.props.balance}
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
  balance: selectBalance()
});


export default connect(mapStateToProps)(MyPage)
