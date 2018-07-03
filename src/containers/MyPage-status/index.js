import React, { Component } from 'react'
import { myPageStyles, modalStyles } from "./styles"
import PropTypes from 'prop-types'
import ActivityCardSmall from '../../components/ActivityCardSmall'
import TicketCard from '../../components/TicketCard'
import HorseStatusCard from '../../components/HorseStatusCard'
import HorseStatusCardModal from '../../components/HorseStatusCardTicketModal'
import loadingGif from '../../assets/static_assets/umaloading.gif'
import Modal from 'react-modal'
import Pagination from '../../components/Pagination'
import { getHorseData, trainHorse, shuffleAll } from "../../utils/eth-function";

Modal.setAppElement('#root');
class MyPageStatus extends Component{
  static propTypes={
    balance: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    getHorseInfo: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    trainTicketNum: PropTypes.number.isRequired,
    shuffleTicketNum: PropTypes.number.isRequired,
    shuffleAllTicketNum: PropTypes.number.isRequired,
    ownedHorses: PropTypes.array.isRequired,
    horseIdToInfo: PropTypes.object.isRequired,
  };
  constructor(props){
    super(props);
    this.state={
      isOpenTicketModal: false,
      ticketName: '',
      ticketHorseId: 0,
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 5,
      selectedHorseId: 0,
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.selectHorse = this.selectHorse.bind(this)
  }

  componentWillReceiveProps(props,state){
    if(this.state.totalPage !== Math.ceil(props.ownedHorses.length / 6)){
      this.setState({
        totalPage: Math.ceil(props.ownedHorses.length / 6)
      })
    }
  }
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
    console.log(trainTicketNum)
    let ticketCard = [];
    for(var i=0;i<trainTicketNum;i++){
      ticketCard.push(<TicketCard className='trainTicket' key={i + '-train-ticket'}/>)
    }
    return ticketCard;
  }
  renderShuffleTicket(){
    const shuffleTicketNum = this.props.shuffleTicketNum > 2 ? 2 : this.props.shuffleTicketNum;
    let ticketCard = [];
    for(var i = 0;i<shuffleTicketNum;i++){
      ticketCard.push(<TicketCard className='dressUpTicket' key={i + '-shuffle-ticket'}/>)
    }
    return ticketCard;
  }
  renderShuffleAllTicket(){
    const shuffleAllTicketNum = this.props.shuffleAllTicketNum > 2 ? 2 : this.props.shuffleAllTicketNum;
    let ticketCard = [];
    for(var i = 0;i<shuffleAllTicketNum;i++){
      ticketCard.push(<TicketCard className='shuffleDressUpTicket' key={i + '-shuffle-dress-up-ticket'} />)
    }
    return ticketCard;
  }

  renderHorses(){
    const self = this;
    const array = this.props.ownedHorses ? this.props.ownedHorses.slice(0,4) : [];
    return array.map(function (elem,index) {
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        const isLeft = index === 0;
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
  openTicketModal(){
    this.setState({
      isOpenTicketModal: true,
      totalPage: Math.ceil(this.props.ownedHorses.length / 6)
    })
  }
  closeTicketModal(){
    this.setState({
      isOpenTicketModal: false
    })
  }
  selectTicket(ticketName){
    this.setState({
      ticketName: ticketName
    })
  }
  useTicket(ticketName){
    const { selectedHorseId } = this.state;
    switch (ticketName){
      case 'trainTicket':
        trainHorse(selectedHorseId);
        break;
      case 'dressUpTicket':
        break;
      case 'shuffleDressUpTicket':
        shuffleAll(selectedHorseId);
        break;
      default:
        return
    }
  }
  renderModalTicket(className,ticketNum){
    const {ticketName} = this.state;
    return(
        <div style={modalStyles.ticket}>
          <button
              style={modalStyles.ticketButton(className,ticketName)}
              onClick={()=>this.selectTicket(className)}
              className={className}
          />
          <div style={modalStyles.ticketUseButtonWrapper}>
            <button  className={'eth-balance-back'} style={modalStyles.userButton} onClick={()=>this.useTicket(ticketName)}>use ></button>
            <span style={modalStyles.ticketNum}>x {ticketNum}</span>
          </div>
        </div>
    )
  }

  onChangePage(currentPage){
    this.setState({
      currentPage: currentPage
    })
  }

  selectHorse(id){
    this.setState({
      selectedHorseId: id
    })
  }
  renderModalHorses(){
    const self = this;
    const array = this.props.ownedHorses ? this.props.ownedHorses.slice(6*(this.state.currentPage-1),6*this.state.currentPage) : [];

    return array.map(function (elem,index) {
      const isLeft = index % 3 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <HorseStatusCardModal
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
                key={'myhorse-'+index}
                isSelected={self.state.selectedHorseId === horse[0].toNumber()}
                selectHorse={self.selectHorse}
            />
        )
      }else{
        getHorseData(elem.toNumber()).then((result) => {
          self.props.getHorseInfo(result)
        });
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
    const {trainTicketNum,shuffleTicketNum,shuffleAllTicketNum} = this.props;
    const totalTicketNum = trainTicketNum + shuffleTicketNum + shuffleAllTicketNum;
    return(
        <div style={myPageStyles.outerContainer}>
          <Modal
              style={modalStyles.modalBase}
              onRequestClose={()=>this.closeTicketModal()}
              isOpen={this.state.isOpenTicketModal}
          >
            <div style={modalStyles.modalHeader}>Ticket</div>
            <div style={modalStyles.modalHeaderBottom}>You have {totalTicketNum} tickets now</div>
            <div style={modalStyles.modalContent}>
              <div style={modalStyles.modalContentTop}>step1. Choose a ticket, step2. Choose a horse</div>
              <div style={modalStyles.modalContentMain}>
                <div style={modalStyles.ticketContainer}>
                  {this.renderModalTicket('trainTicket',trainTicketNum)}
                  {this.renderModalTicket('dressUpTicket',shuffleTicketNum)}
                  {this.renderModalTicket('shuffleDressUpTicket',shuffleAllTicketNum)}
                </div>
                <div style={modalStyles.horseContainer}>
                  {this.renderModalHorses()}
                  <Pagination
                      totalPage={this.state.totalPage}
                      currentPage={this.state.currentPage}
                      buttonPerPage={this.state.buttonPerPage}
                      onChangePage={this.onChangePage}
                  />
                </div>
              </div>
            </div>
          </Modal>
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
                  <button style={myPageStyles.activityMore} onClick={()=>this.openTicketModal()}>
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

export default MyPageStatus;
