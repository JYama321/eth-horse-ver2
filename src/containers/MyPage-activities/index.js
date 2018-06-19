import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectActivity
} from './selectors'
import { activityPageStyle } from "./styles";
import ActivityCard from '../../components/ActivityCard'

class MyPageActivity extends Component{
  componentDidMount(){
    const hostRace = window.contract_instance.HostRace({_host:window.web3.eth.coinbase},{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const getHorse = window.contract_instance.Transfer({
      _to: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const sellHorse = window.contract_instance.Transfer({
      _from: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const HorseOnSale = window.contract_instance.HorseOnSale({
      _from: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest'
    });
    const ApplyRace = window.contract_instance.ApplyRace({
      _owner: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest'
    });
    const BetRace = window.contract_instance.BetRace({
      _voter: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest'
    });
  }

  renderCard(){
    return this.props.activity.toArray().map((elem,index) => {
      return <ActivityCard event={elem.event} args={elem.args} key={elem.event+index}/>
    })
  }

  render(){
    return(
        <div style={activityPageStyle.outerContainer}>
          <div style={activityPageStyle.innerContainer}>
            {this.renderCard()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  activity: selectActivity()
});

export default connect(mapStateToProps)(MyPageActivity)
