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
  selectHorseIdToHorseInfo
} from './selectors'
import {
  startLoadOnSaleHorses,
  startLoadOnSaleHorsePrices,
  changePage
} from "./actions";
import HorseStatusCard from '../../components/MarketHorseStatusCard'
import loadingGif from '../../assets/static_assets/umaloading.gif'
import saga from './saga'

class Market extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 10
    };
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount(){
    if(!this.props.saleHorsesLoaded){
      this.props.startLoadOnSaleHorses()
    }
  }

  componentWillReceiveProps(props,state){
    if(this.state.totalPage !== Math.ceil(props.saleHorses.toArray().length / 8)){
      this.setState({
        totalPage: Math.ceil(props.saleHorses.toArray().length / 8)
      })
    }
  }

  onChangePage(currentPage){
    this.setState({
      currentPage: currentPage
    },function(){
      this.props.changePage(currentPage)
    })
  }

  renderHorses(){
    const self = this;
    const array = this.props.saleHorses ? this.props.saleHorses.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
    return array.map(function (elem,index) {
      const isLeft = index % 4 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <HorseStatusCard
                info={horse}
                isMyHorse={false}
                isLeft={isLeft}
                key={'saleHorse-'+index}
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

  render () {
    return (
        <div style={styles.outerContainer}>
          <div style={styles.innerContainer}>
            {this.renderHorses()}
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
  horseIdToInfo: selectHorseIdToHorseInfo()
});

const mapDispatchToProps = (dispatch)  => ({
  startLoadOnSaleHorses: () => dispatch(startLoadOnSaleHorses()),
  changePage: (page) => dispatch(changePage(page)),
});

const withSaga = injectSaga({key: 'market-saga', saga});

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
    withSaga,
    withConnect
)(Market)
