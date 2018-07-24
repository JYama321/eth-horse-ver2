import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import Lottery from '../build/contracts/Lottery.json'
import HorseGame from '../build/contracts/HorseGame.json'
import RaceFunction from '../build/contracts/RaceFunction'
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
    getTrainTicket,
    getDressUpTicket,
    getShuffleAllTicket,
    getMyHorseArraySuccess,
    getTotalPrizeArray,
    getHorseGeneArray,
    getWinCountArray,
    getSirePrices,
    getSireHorses,
    getOnSaleHorsesArray,
    getSaleHorsePrices,
    getHorseInfo,
    dispatchGetMatePrice
} from './actions'
const address = '0xf00bf4f35cb59605c22b986cd90dbd9b990cd4f2';
const lotteryAddress = '0x9f21f93372061a74cd169815fb752cdd77958098';
const raceAddress = '0xf247ffdc15ccdfac41ceb820d228e149dd459a8b';
import {
    getWantedRaceArray,
    getBettingRaceArray,
    getCheckedRaceArray,
    getMyRaceArray,
    getTrainTicketNum,
    getDressUpTicketNum,
    getShuffleAllTicketNum,
    getMyHorsesArray,
    getHorseWinCountArray,
    getGeneArray,
    getHorseTotalPrizeArray,
    getSirePricesArray,
    getSireHorsesArray,
    getOnSaleHorses,
    getHorsePrices,
    getMatePrice,
} from './utils/eth-function'
import {
    selectBalance
} from "./selectors";
import { appStyles } from "./style";
import loadGif from './assets/umaLoading.gif'
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
        const coinbase = window.web3.eth.coinbase;
        const contract = window.web3.eth.contract(HorseGame.abi);
        const lottery = window.web3.eth.contract(Lottery.abi);
        const Race = window.web3.eth.contract(RaceFunction.abi);
        window.contract_instance = contract.at(address);
        window.lottery_contract = lottery.at(lotteryAddress);
        window.race_contract = Race.at(raceAddress);
        //raceArrays
        const wantedArray = await getWantedRaceArray();
        const bettingArray = await getBettingRaceArray();
        const checkedArray = await getCheckedRaceArray();
        const myRaceArray = await getMyRaceArray();
        const myHorseArray = await getMyHorsesArray();
        const totalPrizeArray = await getHorseTotalPrizeArray();
        const winCountArray = await getHorseWinCountArray();
        const geneArray = await getGeneArray();
        const priceArray = await getHorsePrices();
        const sirePrices = await getSirePricesArray();
        const sireArray = await getSireHorsesArray();
        const saleHorseArray = await getOnSaleHorses();
        const matePrice = await getMatePrice();

        this.props.getMatePrice(matePrice.toNumber());
        this.props.getSaleHorses(saleHorseArray);
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
        this.props.getHorsePrices(priceArray);
        const trainTicketNum = await getTrainTicketNum();
        const dressUpTicketNum= await getDressUpTicketNum();
        const shuffleAllTicketNum = await getShuffleAllTicketNum();
        this.props.getTicket(trainTicketNum);
        this.props.getDressUpTicket(dressUpTicketNum);
        this.props.getShuffleAllTicket(shuffleAllTicketNum);
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
        const LotteryLog = window.lottery_contract.LotteryLog({
            _from: window.web3.eth.coinbase
        },{
            fromBlock: 0,
            toBlock: 'latest'
        });
        BetRace.watch(function(err,result){
            self.props.getActivity(result);
        });
        HorseOnSale.watch(function(err,result){
            self.props.getActivity(result);
            getOnSaleHorses().then(array => {
                self.props.getSaleHorses(array);
            });
            getSirePricesArray().then(array => {
                self.props.getSirePrices(array);
            })
        });
        hostRace.watch(function(err,result){
            self.props.getActivity(result);
            getWantedRaceArray().then(wantedArray => {
                self.props.getWantedArray(wantedArray);
            });
        });
        ApplyRace.watch(function(err,result){
            self.props.getActivity(result);
        });
        GetHorse.watch(function(err,result){
            self.props.getActivity(result);
            getMyHorsesArray().then(myRaces => {
                self.props.getMyHorseArray(myRaces);
            });
        });
        SellHorse.watch(function(err,result){
            self.props.getActivity(result)
        });
        LotteryLog.watch(function(err, result){
            self.props.getActivity(result)
        });
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
                    <Route exact path='/market-place/sire/:id' component={SireHorsePage}/>
                    <Route exact path='/races' component={Races} />
                    <Route exact path='/races/:id' component={RaceInfo}/>
                    <Route exact path='/ranking' component={Ranking}/>
                    <Route exact path='/events' component={Event}/>
                </div>
            )
        }else{
            return <img
                src={loadGif}
                style={appStyles.loadGif}
            />
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
    getTicket: (num) => dispatch(getTrainTicket(num)),
    getDressUpTicket: (num) => dispatch(getDressUpTicket(num)),
    getShuffleAllTicket: (num) => dispatch(getShuffleAllTicket(num)),
    getMyHorseArray: (array) => dispatch(getMyHorseArraySuccess(array)),
    getTotalPrizeArray: (array) => dispatch(getTotalPrizeArray(array)),
    getWinCountArray: array => dispatch(getWinCountArray(array)),
    getGeneArray: array => dispatch(getHorseGeneArray(array)),
    getSirePrices: array => dispatch(getSirePrices(array)),
    getSireHorses: array => dispatch(getSireHorses(array)),
    getSaleHorses: array => dispatch(getOnSaleHorsesArray(array)),
    getHorsePrices: array => dispatch(getSaleHorsePrices(array)),
    getHorseInfo: horse => dispatch(getHorseInfo(horse)),
    getMatePrice: price => dispatch(dispatchGetMatePrice(price))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
