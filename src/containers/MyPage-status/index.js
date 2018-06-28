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
    trainTicketNum: PropTypes.number.isRequired,
    shuffleTicketNum: PropTypes.number.isRequired,
    shuffleAllTicketNum: PropTypes.number.isRequired,
    ownedHorses: PropTypes.array.isRequired,
    horseIdToInfo: PropTypes.object.isRequired
  };
  renderActivityCard(){
    return this.props.activities.sort((a,b) => {
      if(a.args._now < b.args._now){
        return 1
      } else if(a.args._now > b.args._now){
        return -1
      } else {
        return 0
      }
    }).slice(0,3).map((elem,index) => {
      return <ActivityCardSmall
          event={elem.event}
          args={elem.args}
          key={'activity-' + index}
      />
    })
  }
  renderTrainTicket(){
    const trainTicketNum = this.props.trainTicketNum > 2 ? 2 : this.props.trainTicketNum;
    let ticketCard = [];
    for(var i=0;i<trainTicketNum;i++){
      ticketCard.push(<TicketCard className='trainTicket' key={i + '-train-ticket'}/>)
    }
    return ticketCard;
  }
  renderShuffleTicket(){
    const shuffleTicketNum = this.props.shuffleTicketNum > 2 ? 2 : this.props.shuffleTicketNum;
    let ticketCard = [];
    for(var i = 0;shuffleTicketNum;i++){
      ticketCard.push(<TicketCard className='shuffleDressUpTicket' key={i + '-shuffle-ticket'}/>)
    }
    return ticketCard;
  }
  renderShuffleAllTicket(){
    const shuffleAllTicketNum = this.props.shuffleAllTicketNum > 2 ? 2 : this.props.shuffleAllTicketNum;
    let ticketCard = [];
    for(var i = 0;shuffleAllTicketNum;i++){
      ticketCard.push(<TicketCard className='dressUpTicket' key={i + '-shuffle-ticket'} />)
    }
    return ticketCard;
  }
  renderHorses(){
    const self = this;
    const array = this.props.ownedHorses ? this.props.ownedHorses.slice(0,4) : [];
    return array.map(function (elem,index) {
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        const isLeft = index === 0 ? true : false
        return (
            <HorseStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
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
                  <b>Owned Ticket</b>
                  <button style={myPageStyles.activityMore}>
                    More >
                  </button>
                </div>
                <div style={myPageStyles.ticketCardContainer}>
                  {this.renderTrainTicket()}
                  {this.renderShuffleTicket()}
                  {this.renderShuffleAllTicket()}
                </div>
              </div>
            </div>
            <div style={myPageStyles.statusHorseList}>
              <div style={myPageStyles.statusHorseLisTitle}>
                <b>Owned Horses</b>
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
