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
import Top from './containers/Top'
import Ranking from './containers/Ranking'
import Event from './containers/Events'
import {
  getWantedRaces,
  getBettingRaces,
  getCheckedRaces,
  getMyRaces,
  getActivities,
  getUserBalance,
  getTicket,
  getMyHorseArraySuccess,
  getTotalPrizeArray,
  getHorseGeneArray,
  getWinCountArray,
  getSirePrices,
  getSireHorses
} from './actions'
const address = '0x82d50ad3c1091866e258fd0f1a7cc9674609d254';
import {
  getWantedRaceArray,
  getBettingRaceArray,
  getCheckedRaceArray,
  getMyRaceArrray,
  getTicketNum,
  getMyHorsesArray,
  getHorseWinCountArray,
  getGeneArray,
  getHorseTotalPrizeArray,
  getSirePricesArray,
  getSireHorsesArray
} from './utils/eth-function'
import {
  selectBalance
} from "./selectors";
import { appStyles } from "./style";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
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
    const myHorseArray = await getMyHorsesArray();
    const totalPrizeArray = await getHorseTotalPrizeArray();
    const winCountArray = await getHorseWinCountArray();
    const geneArray = await getGeneArray();
    const sirePrices = await getSirePricesArray();
    const sireArray = await getSireHorsesArray();

    this.props.getSireHorses(sireArray);
    this.props.getSirePrices(sirePrices);
    this.props.getTotalPrizeArray(totalPrizeArray);
    this.props.getWinCountArray(winCountArray);
    this.props.getGeneArray(geneArray);
    this.props.getMyHorseArray(myHorseArray);
    this.props.getWantedArray(wantedArray);
    this.props.getBettingArray(bettingArray);
    this.props.getCheckedArray(checkedArray);
    this.props.getMyRace(myRaceArray);
    const ticketNum = await getTicketNum(window.web3.eth.coinbase);
    this.props.getTicket(ticketNum);
    this.setState({ loaded: true});
    //get events
    const self = this;
    window.web3.eth.getBalance(window.web3.eth.coinbase,function(err,result){
      if(err){console.log(err)}
      self.props.getBalance(window.web3.fromWei(result,'ether').toNumber().toFixed(2))
    });
    const hostRace = window.contract_instance.HostRace({_host:window.web3.eth.coinbase},{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const GetHorse = window.contract_instance.Transfer({
      _to: window.web3.eth.coinbase
    },{
      fromBlock: 0,
      toBlock: 'latest',
    });
    const SellHorse = window.contract_instance.Transfer({
      _from: window.web3.eth.coinbase
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
    GetHorse.get(function(err, logs) {
      self.props.getActivity(logs)
    });
    SellHorse.get(function(err, logs) {
      self.props.getActivity(logs)
    })
  }
  render() {
    if(this.state.loaded){
      const path = this.props.history.location.pathname;
      return(
          <div style={appStyles.container(path)}>
            <Helmet
                titleTemplate="%s - Eth Horse"
                defaultTitle="Eth Horse"
            >
              <meta name="description" content="An decentralized horse race platform" />
            </Helmet>
            <Header
                balance={String(this.props.balance)}
                pathname={this.props.history.location.pathname}
            />
            <Route exact path='/' component={Top}/>
            <Route exact path='/my-page' component={MyPage}/>
            <Route exact path='/horses/:id' component={HorseInfo}/>
            <Route exact path='/horses/:id/sire' component={SireHorsePage}/>
            <Route exact path='/market-place' component={Market}/>
            <Route exact path='/races' component={Races} />
            <Route exact path='/races/:id' component={RaceInfo}/>
            <Route exact path='/ranking' component={Ranking}/>
            <Route exact path='/events' component={Event}/>
          </div>
      )
    }else{
      return null
    }
  }
}
const mapStateToProps = (state,ownProps) => createStructuredSelector({
  balance: selectBalance()
});

const mapDispatchToProps = (dispatch) => ({
  getWantedArray: (array) => dispatch(getWantedRaces(array)),
  getBettingArray: (array) => dispatch(getBettingRaces(array)),
  getCheckedArray: (array) => dispatch(getCheckedRaces(array)),
  getMyRace: (array) => dispatch(getMyRaces(array)),
  getActivity: (activity) => dispatch(getActivities(activity)),
  getBalance: (balance) => dispatch(getUserBalance(balance)),
  getTicket: (num) => dispatch(getTicket(num)),
  getMyHorseArray: (array) => dispatch(getMyHorseArraySuccess(array)),
  getTotalPrizeArray: (array) => dispatch(getTotalPrizeArray(array)),
  getWinCountArray: array => dispatch(getWinCountArray(array)),
  getGeneArray: array => dispatch(getHorseGeneArray(array)),
  getSirePrices: array => dispatch(getSirePrices(array)),
  getSireHorses: array => dispatch(getSireHorses(array))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
