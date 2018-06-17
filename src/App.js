import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import HorseGame from '../build/contracts/HorseGame.json'
import { Helmet } from 'react-helmet'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import Header from './components/Header/'
import {Route} from 'react-router-dom'
import HorseInfo from './containers/Info-horse/'
import SireHorsePage from './containers/SireHorsePage/'
import Market from './containers/Market/'
import Races from './containers/Races/'
import RaceInfo from './containers/RaceInfo'
import MyPage from './containers/MyPage'

import {
  getWantedRaces,
  getBettingRaces,
  getCheckedRaces,
  getMyRaces,
  getActivities
} from './actions'
const address = '0xcb152a2aa90055a0d255ca7dbaeb85edfdc86096';
import {
  getWantedRaceArray,
  getBettingRaceArray,
  getCheckedRaceArray,
  getMyRaceArrray
} from './utils/eth-function'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  async componentWillMount() {
    const result = await getWeb3();
    window.web3 = result.web3;
    const contract = window.web3.eth.contract(HorseGame.abi);
    window.contract_instance = contract.at(address);
    //raceArrays
    const wantedArray = await getWantedRaceArray();
    const bettingArray = await getBettingRaceArray();
    const checkedArray = await getCheckedRaceArray();
    const myRaceArray = await getMyRaceArrray();
    this.props.getWantedArray(wantedArray);
    this.props.getBettingArray(bettingArray);
    this.props.getCheckedArray(checkedArray);
    this.props.getMyRace(myRaceArray);
    this.setState({ loaded: true});
    //get events
    const self = this;
    const hostRace = window.contract_instance.HostRace({_host:window.web3.eth.coinbase},{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const Transfer = window.contract_instance.Transfer({
      _to: window.web3.eth.coinbase
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
    const HorseOnBidSale = window.contract_instance.HorseOnBidSale({
      _from: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest'
    });
    BetRace.get(function(err,logs){
      self.props.getActivity(logs)
    });
    HorseOnSale.get(function(err,logs){
      self.props.getActivity(logs)
    });
    hostRace.get(function(error, logs){
      self.props.getActivity(logs)
    });
    ApplyRace.get(function(err,logs){
      self.props.getActivity(logs)
    });
    Transfer.get(function(err, logs) {
      self.props.getActivity(logs)
    });
  }
  render() {
    if(this.state.loaded){
      return(
          <div>
            <Helmet
                titleTemplate="%s - Eth Horse"
                defaultTitle="Eth Horse"
            >
              <meta name="description" content="An decentralized horse race platform" />
            </Helmet>
            <Header/>
            <Route exact path='/'/>
            <Route exact path='/my-page' component={MyPage}/>
            <Route exact path='/horses/:id' component={HorseInfo}/>
            <Route exact path='/horses/:id/sire' component={SireHorsePage}/>
            <Route exact path='/market-place' component={Market}/>
            <Route exact path='/races' component={Races} />
            <Route exact path='/races/:id' component={RaceInfo}/>
          </div>
      )
    }else{
      return null
    }
  }
}
const mapStateToProps = (state,ownProps) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  getWantedArray: (array) => dispatch(getWantedRaces(array)),
  getBettingArray: (array) => dispatch(getBettingRaces(array)),
  getCheckedArray: (array) => dispatch(getCheckedRaces(array)),
  getMyRace: (array) => dispatch(getMyRaces(array)),
  getActivity: (activity) => dispatch(getActivities(activity))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
