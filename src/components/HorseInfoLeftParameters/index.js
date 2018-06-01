import React, { Component } from 'react'
import {hILeftParamStyle} from "./horseInfoLeftParamStyle";
import PropTypes from 'prop-types'
import HorseStatusGragh from '../HorseStatusGragh'
import HorseStatusParamImages from '../HorseStatusParamImages'
import SireRaceNum from '../HorseStatusSireRaceNum'
class HorseInfoLeftParameters extends Component{
  static propTypes={
    gene: PropTypes.string.isRequired,
    sireIndex: PropTypes.number.isRequired,
    raceIndex: PropTypes.number.isRequired
  };
  totalPower(){
    const gene = this.props.gene.slice(this.props.gene.length-15,this.props.gene.length)
    return Math.ceil(Number(gene.slice(0,3)) / 100)+
        Math.ceil(Number(gene.slice(3,6)) / 100)+
        Math.ceil(Number(gene.slice(6,9)) / 100)+
        Math.ceil(Number(gene.slice(9,12)) / 100)+
        Math.ceil(Number(gene.slice(12,15)) / 100)
  }
  render(){
    const gene = this.props.gene.slice(this.props.gene.length-15,this.props.gene.length)
    return (
        <div style={hILeftParamStyle.container}>
          <p style={hILeftParamStyle.placeText}>
            power/
          </p>
          <p style={hILeftParamStyle.powerTotalTex}>
            power total : {this.totalPower()}
          </p>
          <HorseStatusGragh
              gene={gene}
              style={hILeftParamStyle.horseParamDiagram}
          />
          <HorseStatusParamImages gene={gene} style={hILeftParamStyle.statusParamDiagram}/>
          <SireRaceNum style={hILeftParamStyle.sireAndRaceNum} sireIndex={this.props.sireIndex} raceIndex={this.props.raceIndex}/>
        </div>
    )
  }
}

export default HorseInfoLeftParameters
