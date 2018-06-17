import React, { Component } from 'react'
import { myPageStyles } from "./styles"
import PropTypes from 'prop-types'
import ActivityCardSmall from '../../components/ActivityCardSmall'
import TicketCard from '../../components/TicketCard'
import HorseStatusCard from '../../components/HorseStatusCard'
import loadingGif from '../../assets/static_assets/umaloading.gif'


class MyPageStatus extends Component{
  static propTypes={
    balance: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    ticketNum: PropTypes.number.isRequired,
    ownedHorses: PropTypes.array.isRequired,
    horseIdToInfo: PropTypes.object.isRequired
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
    const ticketNum = this.props.ticketNum > 5 ? 5 : this.props.ticketNum;
    let tickets = [];
    for(let i=0;i<ticketNum;i++){
      tickets.push(<TicketCard key={i}/>)
    }
    return tickets
  }
  renderHorses(){
    const self = this;
    const array = this.props.ownedHorses ? this.props.ownedHorses.slice(0,4) : [];
    return array.map(function (elem,index) {
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <HorseStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={true}
                key={'myhorse-'+index}
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
    })
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
                <button style={myPageStyles.activityMore} onClick={()=> this.props.changeDisplay('activity')}>More ></button>
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
                  {this.renderTickets()}
                </div>
              </div>
            </div>
            <div style={myPageStyles.statusHorseList}>
              <div style={myPageStyles.statusHorseLisTitle}>
                Owned Horses
                <button style={myPageStyles.activityMore} onClick={()=> this.props.changeDisplay('my-horses')}>
                  More >
                </button>
              </div>
              <div style={myPageStyles.statusPageHorseList}>
                {this.renderHorses()}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default MyPageStatus
