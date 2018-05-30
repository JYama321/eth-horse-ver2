import React, { Component } from 'react'
import {sellHorseModalStyle} from "./sellHorseModalStyle";
import {connect} from 'react-redux'
import { compose } from 'redux'
import HorseImage from '../../components/HorseImage/'
import {
  selectHorseIdToHorseInfo,
  selectHorseIdArray,
  selectHorseArrayLoading
} from "./selectors";
import {
  startLoadMyHorseArray
} from './actions'
import HorseStatusCard from '../../components/HorseStatusCard/'
import { createStructuredSelector } from 'reselect';
import loadingGif from '../../assets/static_assets/umaloading.gif'
import saga from './saga'
import injectSaga from "../../utils/injectSaga";

class SireHorsePage extends Component{
  constructor(props){
    super(props);
    this.state={
      currentPage: 1
    }
  }
  componentDidMount(){
    this.props.horseArrayLoadStart()
  }
  renderHorses(){
    const self = this;
    console.log(this.props.horseIdArray)
    const array = this.props.horseIdArray ? this.props.horseIdArray.slice(3*(this.state.currentPage-1),3*this.state.currentPage) : [];
    return array.map(function (elem,index) {
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <HorseStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={false}
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

  render () {
      return (
          <div style={sellHorseModalStyle.modalContainer}>
            <div style={sellHorseModalStyle.modalContent}>
              <div style={sellHorseModalStyle.sireHorseTop}>
                <div style={sellHorseModalStyle.sireHorseImgBack}>
                  <HorseImage type={'normal'} horseGene={'0000000'}/>
                </div>
                <div style={sellHorseModalStyle.sireHorseStatus}>

                </div>
              </div>
              <div style={sellHorseModalStyle.sireHorseList}>
                {this.renderHorses()}
              </div>
            </div>
          </div>
      )
  }
}

const mapStateToProps = () => createStructuredSelector({
  horseIdToInfo: selectHorseIdToHorseInfo(),
  horseIdArray: selectHorseIdArray(),
  isMyHorseArrayLoading: selectHorseArrayLoading()
});
const mapDispatchToProps = (dispatch) => ({
  horseArrayLoadStart: ()=>dispatch(startLoadMyHorseArray()),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'my-horse',saga});

export default compose(
    withConnect,
    withSaga
)(SireHorsePage)
