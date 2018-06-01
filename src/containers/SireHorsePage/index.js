import React, { Component } from 'react'
import {sellHorseModalStyle} from "./sellHorseModalStyle";
import {connect} from 'react-redux'
import { compose } from 'redux'
import HorseImage from '../../components/HorseImage/'
import HorseStatusGragh from '../../components/HorseStatusGragh'
import {
  selectHorseIdToHorseInfo,
  selectHorseIdArray,
  selectHorseArrayLoading
} from "./selectors";
import {
  startLoadMyHorseArray,
  getHorseInfoSuccess
} from './actions'
import { getHorseData } from "../../utils/eth-function";
import HorseStatusCard from '../../components/HorseStatusCard/'
import { createStructuredSelector } from 'reselect';
import loadingGif from '../../assets/static_assets/umaloading.gif'
import saga from './saga'
import injectSaga from "../../utils/injectSaga";

class SireHorsePage extends Component{
  constructor(props){
    super(props);
    this.state={
      currentPage: 1,
      sireHorseInfoLoaded: false
    }
  }
  async componentDidMount(){
    if(!this.props.isMyHorseArrayLoadDone){
      this.props.horseArrayLoadStart()
    }
    const sireHorse = this.props.horseIdToInfo.get(this.props.match.params.id)
    if(sireHorse){
      this.setState({
        sireHorseInfoLoaded: true
      })
    } else {
      const horse = await getHorseData(this.props.match.params.id);
      this.props.getHorseDataSuccess(horse);
      this.setState({
        sireHorseInfoLoaded: true
      })
    }
  }
  renderHorses(){
    const self = this;
    const array = this.props.horseIdArray ? this.props.horseIdArray.slice(3*(this.state.currentPage-1),3*this.state.currentPage) : [];
    return array.map((elem,index) => {
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse) {
        if(horse[0].toNumber() !== Number(self.props.match.params.id)){
          return (
              <div
                  style={sellHorseModalStyle.sireHorseWrapper}
                  key={'myhorse-' + index}
              >
                <HorseStatusCard
                    info={horse}
                    isMyHorse={true}
                    isLeft={true}
                />
                <button style={sellHorseModalStyle.sireHorseButton} className='sire-horse-button'>
                  Sire Horse
                </button>
              </div>
          )
        }
      } else {
        return(
            <img
                key={'loading-'+index}
                src={loadingGif}
                style={{
                  width: '200px',
                  height: '200px',
                  top: '65px'
                }}
            />
        )
      }
    })
  }
  powerTotal(gene){
    return Math.ceil(Number(gene.slice(0,3)) / 100)+
        Math.ceil(Number(gene.slice(3,6)) / 100)+
        Math.ceil(Number(gene.slice(6,9)) / 100)+
        Math.ceil(Number(gene.slice(9,12)) / 100)+
        Math.ceil(Number(gene.slice(12,15)) / 100)
  }

  render () {
    if(this.props.isMyHorseArrayLoadDone && this.state.sireHorseInfoLoaded){
      const id = this.props.match.params.id;
      const horse = this.props.horseIdToInfo.get(id);
      const gene = horse[1].c.join(',').replace(/,/g,'');
      const powerGene = gene.slice(gene.length-15,gene.length)
      return (
          <div style={sellHorseModalStyle.modalContainer}>
            <div style={sellHorseModalStyle.modalContent}>
              <div style={sellHorseModalStyle.sireHorseTop}>
                <div style={sellHorseModalStyle.sireHorseImgWrapper}>
                  <div style={sellHorseModalStyle.sireHorseImgBack} className='sire-horse-back'>
                    <HorseImage type={'sire'} horseGene={gene}/>
                  </div>
                </div>
                <div style={sellHorseModalStyle.sireHorseStatus}>
                  <p style={sellHorseModalStyle.sireHorseName}>
                    {horse[2]}
                  </p>
                  <div style={sellHorseModalStyle.sireHorseStatus}>
                    <p style={sellHorseModalStyle.sireHorsePowerTotal}>power total : {this.powerTotal(powerGene)}</p>
                    <HorseStatusGragh
                        gene={powerGene}
                        style={sellHorseModalStyle.horseParamDiagram}
                    />
                  </div>
                </div>
              </div>
              <div style={sellHorseModalStyle.sireHorseList}>
                <div style={sellHorseModalStyle.sireHorseListInnerContainer}>
                  {this.renderHorses()}
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = () => createStructuredSelector({
  horseIdToInfo: selectHorseIdToHorseInfo(),
  horseIdArray: selectHorseIdArray(),
  isMyHorseArrayLoadDone: selectHorseArrayLoading()
});
const mapDispatchToProps = (dispatch) => ({
  horseArrayLoadStart: ()=>dispatch(startLoadMyHorseArray()),
  getHorseDataSuccess: (horse)=>dispatch(getHorseInfoSuccess(horse))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'my-horse',saga});

export default compose(
    withConnect,
    withSaga
)(SireHorsePage)
