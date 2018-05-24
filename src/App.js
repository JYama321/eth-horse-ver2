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
const address = '0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f';

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
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="React.js Boilerplate"
            >
              <meta name="description" content="A React.js Boilerplate application" />
            </Helmet>
            <Header/>
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
