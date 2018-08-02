import React, { Component } from 'react'
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga'
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {styles} from "./styles";
import Pagination from '../../components/Pagination'
import {
    selectOnSaleArrayLoaded,
    selectOnSalePriceArrayLoaded,
    selectOnSalePriceArray,
    selectOnSaleHorseArray,
    selectHorseIdToHorseInfo,
    selectMarketSort,
    selectSireHorsesArray,
    selectSirePricesArray,
    selectMarketType,
    selectActivity
} from './selectors'
import {
    getHorseData
} from "../../utils/eth-function";
import {
    startLoadOnSaleHorses,
    startLoadOnSaleHorsePrices,
    changePage,
    getHorseInfoSuccess
} from "./actions";
import HorseStatusCard from '../../components/MarketHorseStatusCard';
import saga from './saga'
import LoadingHorseStatus from '../../components/HorseStatusLoading'
const loadingGif = 'https://image.eth-horse.com/static_assets/loading_default.gif';

class Market extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalPage: 1,
            currentPage: 1,
            buttonPerPage: 10,
        };
        this.onChangePage = this.onChangePage.bind(this)
    }

    componentWillReceiveProps(props,state){
        if(this.state.totalPage !== Math.ceil(props.saleHorses.toArray().length / 8)){
            this.setState({
                totalPage: Math.ceil(props.saleHorses.toArray().length / 8)
            })
        }
        if(props.activity.toArray().length > 0 && props.activity.toArray().pop().event === 'HorseOnSale' && !props.horseIdToInfo.get(String(props.activity.toArray().pop().args._tokenId.toNumber()))){
            getHorseData(props.activity.toArray().pop().args._tokenId.toNumber()).then(horse => this.props.getHorse(horse))
        }
    }

    onChangePage(currentPage){
        this.setState({
            currentPage: currentPage
        },function(){
            this.props.changePage(currentPage)
        })
    }


    renderHorses(sort){
        const self = this;
        const marketType = this.props.marketType;
        const isSire = (marketType === 'sire-horse' ? true : false);
        const priceOriginArray = isSire ? this.props.sirePrices : this.props.saleHorsePrices;
        let num = 0;
        switch(sort){
            case 'default':
                let defaultArray;
                if(marketType === 'buy-horse') {
                    defaultArray = this.props.saleHorses ? this.props.saleHorses.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
                }else {
                    defaultArray = this.props.sireHorses ? this.props.sireHorses.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
                }
                return defaultArray.map(function (elem,index) {
                    const isLeft = index % 4 === 0;
                    const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
                    if(horse){
                        return (
                            <HorseStatusCard
                                info={horse}
                                isMyHorse={false}
                                isLeft={isLeft}
                                isSire={isSire}
                                history={self.props.history}
                                key={'saleHorse-'+index}
                            />
                        )
                    }else{
                        getHorseData(String(elem.toNumber())).then((result) => {
                            self.props.getHorse(result);
                        });
                    }
                });
            case 'high-price':
                const higherOrderArray = priceOriginArray ? priceOriginArray.map((elem,index) => {
                    if(elem.toNumber() > 0){
                        return {id: index+1, price: window.web3.fromWei(elem).toFixed(3)}
                    }else{
                        return null
                    }
                }).filter(elem => {return elem !== null}).sort((a,b) => {
                    if(a.price < b.price){
                        return 1
                    } else if(a.price > b.price){
                        return -1
                    } else {
                        return 0
                    }
                }).slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
                return higherOrderArray.map(function (elem,index) {
                    const horse = self.props.horseIdToInfo.get(String(elem.id)) ? self.props.horseIdToInfo.get(String(elem.id)) : null;
                    if((horse && horse[11]) || (horse && horse[13])){
                        num+=1;
                        return (
                            <HorseStatusCard
                                info={horse}
                                isMyHorse={false}
                                isLeft={(num - 1) % 4 === 0}
                                isSire={isSire}
                                history={self.props.history}
                                key={'saleHorse-'+index}
                            />
                        )
                    }else if(horse && !horse[11]){
                        return null
                    }else{
                        getHorseData(elem.id).then((result) => {
                            self.props.getHorse(result);
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
                });
            case 'low-price':
                let lowerOrderArray;
                lowerOrderArray = priceOriginArray ? priceOriginArray.map((elem,index) => {
                    if(elem.toNumber() > 0){
                        return {id: index+1, price: window.web3.fromWei(elem).toFixed(3)}
                    }
                }).filter(elem => elem !== undefined).sort((a,b) => {
                    if(a.price > b.price){
                        return 1
                    } else if(a.price < b.price){
                        return -1
                    } else {
                        return 0
                    }
                }).slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
                return lowerOrderArray.map(function (elem,index) {
                    const horse = self.props.horseIdToInfo.get(String(elem.id)) ? self.props.horseIdToInfo.get(String(elem.id)) : null;
                    if ((horse && horse[11]) || (horse && horse[13])) {
                        num+=1;
                        return (
                            <HorseStatusCard
                                info={horse}
                                isMyHorse={false}
                                isLeft={(num - 1) % 4 === 0}
                                isSire={isSire}
                                history={self.props.history}
                                key={'saleHorse-' + index}
                            />
                        )
                    } else if(horse && !horse[11]){
                        return null
                    }else {
                        getHorseData(elem.id).then((result) => {
                            self.props.getHorse(result);
                        });
                        return (
                           <LoadingHorseStatus isLeft={(num - 1) % 4 === 0} key={'loading' + index}/>
                        )
                    }
                });
            default:
                return null
        }

    }

    render () {
        const { sortType } = this.props;
        return (
            <div style={styles.outerContainer}>
                <div style={styles.innerContainer}>
                    {this.renderHorses(sortType)}
                    <Pagination
                        totalPage={this.state.totalPage}
                        currentPage={this.state.currentPage}
                        buttonPerPage={this.state.buttonPerPage}
                        onChangePage={this.onChangePage}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    saleHorses: selectOnSaleHorseArray(),
    saleHorsesLoaded: selectOnSaleArrayLoaded(),
    saleHorsePrices: selectOnSalePriceArray(),
    saleHorsePricesLoaded: selectOnSalePriceArrayLoaded(),
    horseIdToInfo: selectHorseIdToHorseInfo(),
    sortType: selectMarketSort(),
    marketType: selectMarketType(),
    activity: selectActivity(),
    sireHorses: selectSireHorsesArray(),
    sirePrices: selectSirePricesArray(),
});

const mapDispatchToProps = (dispatch)  => ({
    startLoadOnSaleHorses: () => dispatch(startLoadOnSaleHorses()),
    changePage: (page) => dispatch(changePage(page)),
    getHorse: (horse) => dispatch(getHorseInfoSuccess(horse))
});

const withSaga = injectSaga({key: 'market-saga', saga});

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
    withSaga,
    withConnect
)(Market)
