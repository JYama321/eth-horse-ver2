import React, { Component } from 'react'
import { parentsInfoStyle } from "./parentsInfoStyle"
import PropTypes from 'prop-types'
import {getHorseData} from "../../utils/eth-function"
import {selectHorseIdToHorseInfo} from "./selectors"
import { createStructuredSelector } from 'reselect'
import { getHorseInfoSuccess } from './actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Parent from './horseParent'
class HorseInfoParents extends Component{
  static propTypes={
    papaId: PropTypes.number.isRequired,
    mamaId: PropTypes.number.isRequired,
  };
  constructor(props){
    super(props);
    this.state={
      isPapaLoading: true,
      isMamaLoading: true
    }
  }
  componentDidMount(){
    const papa = this.props.horseIdToInfo.get(String(this.props.papaId));
    const mama = this.props.horseIdToInfo.get(String(this.props.mamaId));
    const self = this;
    if(!papa){
      try {
        getHorseData(this.props.papaId).then(function(result){
          self.props.getHorseInfoSuccess(result);
          self.setState({isPapaLoading: false})
        })
      } catch (err) {
        self.setState({isPapaLoading: false})
      }
    }else{
      self.setState({isPapaLoading: false})
    }
    if(!mama){
      try {
        getHorseData(this.props.mamaId).then(function(result){
          self.props.getHorseInfoSuccess(result);
          self.setState({isMamaLoading: false})
        })
      } catch (err) {
        self.setState({isMamaLoading: false})
      }
    }else{
      self.setState({isMamaLoading: false})
    }
  }

  renderPapaInfo(){
    if(this.state.isPapaLoading || this.props.papaId === 0){
      return (
          <Parent gene={'000'} sireIndex={0} raceIndex={0} name={'none'} horseId={0}/>
      )
    } else {
      const papa = this.props.horseIdToInfo.get(String(this.props.papaId));
      const name = papa[2];
      const gene = papa[1].c.join(',').replace(/,/g,'');
      const sireIndex = papa[6].toNumber();
      const raceIndex = papa[7].toNumber();
      return (
          <Parent gene={gene} sireIndex={sireIndex} raceIndex={raceIndex} name={name} horseId={this.props.papaId}/>
      )
    }
  }
  renderMamaInfo(){
    if(this.state.isMamaLoading || this.props.mamaId === 0){
      console.log('now loading')
      return (
          <Parent gene={'000'} sireIndex={0} raceIndex={0} name={'none'} horseId={0}/>
      )
    } else {
      console.log('finish loading')
      const mama = this.props.horseIdToInfo.get(String(this.props.mamaId));
      const name = mama[2];
      const gene = mama[1].c.join(',').replace(/,/g,'');
      const sireIndex = mama[6].toNumber();
      const raceIndex = mama[7].toNumber();
      return (
          <Parent gene={gene} sireIndex={sireIndex} raceIndex={raceIndex} name={name} horseId={this.props.mamaId}/>
      )
    }
  }
  render(){
    return (
        <div style={parentsInfoStyle.parentsContainer}>
          <div style={parentsInfoStyle.parentContainer}>
            {this.renderPapaInfo()}
          </div>
          <div style={parentsInfoStyle.parentContainer}>
            {this.renderMamaInfo()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  horseIdToInfo: selectHorseIdToHorseInfo()
});
const mapDispatchToProps = (dispatch) => ({
  getHorseInfoSuccess: (horse) => dispatch(getHorseInfoSuccess(horse))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
    withConnect
)(HorseInfoParents)
