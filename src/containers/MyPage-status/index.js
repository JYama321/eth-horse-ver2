import React, { Component } from 'react'
import { myPageStyles } from "./styles"
import PropTypes from 'prop-types'
import ActivityCardSmall from '../../components/ActivityCardSmall'


class MyPageStatus extends Component{
  static propTypes={
    balance: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    ticketNum: PropTypes.number.isRequired
  };
  renderActivityCard(){
    return this.props.activities.slice(0,3).map((elem,index) => {
      return <ActivityCardSmall
          event={elem.event}
          args={elem.args}
          key={'activity-' + index}
      />
    })
  }
  renderTickets(){

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
              <div style={myPageStyles.activityTitle}><b>Activity</b>
                <button style={myPageStyles.activityMore} onClick={()=> this.props.changeDisplay('activity')}>more ></button>
              </div>
              <div style={myPageStyles.activityHistory}>
                {this.renderActivityCard()}
              </div>
              <div style={myPageStyles.statusPageTicket}>
                <div style={myPageStyles.ticketTitle}>
                  Owned Ticket:
                  <button style={myPageStyles.activityMore}>
                    More >
                  </button>
                </div>
                <div style={myPageStyles.ticketCardContainer}>

                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default MyPageStatus
