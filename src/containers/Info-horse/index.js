import React, { Component } from 'react'
import {horseInfoStyles} from "./horseInfoStyles";
import HorseImage from '../../components/HorseImage/'
import HorseInfoLeft from '../../components/HorseInfoLeftComp/'
import HorseInfoParents from '../../components/HorseInfoParents'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectHorseIdToHorseInfo,
  selectIsHorseInfoLoading
} from './selectors'
import {
  startGetHorseInfo
} from "./actions";
import saga from './saga'
import injectSaga from '../../utils/injectSaga'

class HorseInfo extends Component{
  componentDidMount(){
    if(!this.props.horseIdToInfo.get(this.props.match.params.id)){
      this.props.startGetHorseInfo(this.props.match.params.id)
    }
  }
  render () {
    if(!this.props.isHorseInfoLoading){
      return (
          <div style={horseInfoStyles.outerContainer}>
            <div style={horseInfoStyles.innerContainer}>
              <div style={horseInfoStyles.horseInfoLeft}>
                <HorseInfoLeft
                    horseInfo={this.props.horseIdToInfo.get(this.props.match.params.id)}
                />
              </div>
              <div style={horseInfoStyles.horseInfoRight}>
                <div style={horseInfoStyles.horseImageBack} className='horse-back'>
                  <HorseImage type={'large'} horseGene={this.props.horseIdToInfo.get(this.props.match.params.id) ? this.props.horseIdToInfo.get(this.props.match.params.id)[1].c.join(',').replace(/,/g,'') : '000000000'}/>
                </div>
                <div style={horseInfoStyles.horseParentsContainer}>
                  <div style={horseInfoStyles.horseParentsTop}>
                    <p style={horseInfoStyles.parentsPlaceText}>parents /</p>
                  </div>
                  <HorseInfoParents
                      papaId={this.props.horseIdToInfo.get(this.props.match.params.id)[5].toNumber()}
                      mamaId={this.props.horseIdToInfo.get(this.props.match.params.id)[4].toNumber()}
                  />
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
  isHorseInfoLoading: selectIsHorseInfoLoading()
});

const mapDispatchToProps = (dispatch) => ({
  startGetHorseInfo: (id)=>dispatch(startGetHorseInfo(id)),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'horseInfo',saga});

export default compose(
    withConnect,
    withSaga
)(HorseInfo)
