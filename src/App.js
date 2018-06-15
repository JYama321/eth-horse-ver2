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
import MyPageHorses from './containers/MyPage-horses/'
import HorseInfo from './containers/Info-horse/'
import SireHorsePage from './containers/SireHorsePage/'
import Market from './containers/Market/'
import Races from './containers/Races/'
const address = '0x2a504b5e7ec284aca5b6f49716611237239f0b97';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentWillMount() {
    const self = this;
    getWeb3
        .then(results => {
          window.web3 = results.web3;
          return window.web3;
        })
        .then(result => {
          const contract = window.web3.eth.contract(HorseGame.abi);
          window.contract_instance = contract.at(address);
          window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
          return window.contract_instance
        }).then(function (instance) {
      self.setState({
        loaded:true
      });
      return instance;
    }).then(function (instance) {
      // self.props.actions.getEtherBalance();
      return instance
    }).catch((err) => {
      console.log(err);
      console.log('Error finding web3.')
    })
  }
  render() {
    if(window.web3 && window.contract_instance){
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
            <Route exact path='/my-horses' component={MyPageHorses}/>
            <Route exact path='/horses/:id' component={HorseInfo}/>
            <Route exact path='/horses/:id/sire' component={SireHorsePage}/>
            <Route exact path='/market-place' component={Market}/>
            <Route exact path='/races' component={Races} />
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

export default connect(mapStateToProps)(App);
