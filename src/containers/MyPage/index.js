import React, { Component } from 'react'
import {selectMyPageCurrentDisp} from "./selectors";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import MyPageHorses from '../MyPage-horses'
import MyPageActivity from '../MyPage-activities'
class MyPage extends Component {
  render(){
    switch(this.props.currentDisplay){
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
  currentDisplay: selectMyPageCurrentDisp()
});

export default connect(mapStateToProps)(MyPage)
