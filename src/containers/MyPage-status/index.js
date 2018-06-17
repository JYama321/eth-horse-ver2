import React, { Component } from 'react'
import { myPageStyles } from "./styles";
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class MyPageStatus extends Component{
  static propTypes={
    balance: PropTypes.string
  };
  changeMyPageDisplay(){

  }
  render(){
    return(
        <div style={myPageStyles.outerContainer}>
          <div style={myPageStyles.innerContainer}>
            <div style={myPageStyles.statusBox}>
              <div style={myPageStyles.statusPic}>
                T
              </div>
              <div style={myPageStyles.statusData}>
                <p style={myPageStyles.userNameAddress}>User Name: xxx</p>
                <p style={myPageStyles.userNameAddress}>Address: <br/>{window.web3.eth.coinbase}</p>
                <p style={myPageStyles.userBalance}>Your ETH Balance</p>
                <div style={myPageStyles.ethBalance} className='eth-balance-back'>Balance {this.props.balance} ETH</div>
              </div>
            </div>
            <div style={myPageStyles.activityBox}>
              <div style={myPageStyles.activityTitle}><b>Activity</b> <button >more ></button></div>
            </div>
          </div>
        </div>
    )
  }
}

export default MyPageStatus
