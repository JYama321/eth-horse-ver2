import React, { Component } from 'react'
import {hILeftParamStyle} from "./horseInfoLeftParamStyle";
import PropTypes from 'prop-types'

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
          <div style={hILeftParamStyle.horseParamDiagram}>
            <span style={hILeftParamStyle.strengthParam(Number(gene.slice(0,3)),0.2)}></span>
            <span style={hILeftParamStyle.strengthParam(Number(gene.slice(3,6)),0.4)}></span>
            <span style={hILeftParamStyle.strengthParam(Number(gene.slice(6,9)),0.6)}></span>
            <span style={hILeftParamStyle.strengthParam(Number(gene.slice(9,12)),0.8)}></span>
            <span style={hILeftParamStyle.strengthParam(Number(gene.slice(12,15)),1)}></span>
          </div>
          <div style={hILeftParamStyle.statusParamDiagram}>
            <p style={hILeftParamStyle.statusParamDiagramP}>
              <img src={require('../../assets/static_assets/power-square.png')}/>
              &nbsp; strength
              <span style={hILeftParamStyle.statusParamNum}>{Math.ceil(Number(gene.slice(0,3)) / 100)}</span>
            </p>
            <p style={hILeftParamStyle.statusParamDiagramP}>
              <img src={require('../../assets/static_assets/power-square2.png')}/>
              &nbsp; speed
              <span style={hILeftParamStyle.statusParamNum}>{Math.ceil(Number(gene.slice(3,6)) / 100)}</span>
            </p>
            <p style={hILeftParamStyle.statusParamDiagramP}>
              <img src={require('../../assets/static_assets/power-square3.png')}/>
              &nbsp; stamina
              <span style={hILeftParamStyle.statusParamNum}>{Math.ceil(Number(gene.slice(6,9)) / 100)}</span>
            </p>
            <p style={hILeftParamStyle.statusParamDiagramP}>
              <img src={require('../../assets/static_assets/power-square4.png')}/>
              &nbsp; intelligence
              <span style={hILeftParamStyle.statusParamNum}>{Math.ceil(Number(gene.slice(9,12)) / 100)}</span>
            </p>
            <p style={hILeftParamStyle.statusParamDiagramP}>
              <img src={require('../../assets/static_assets/power-square5.png')}/>
              &nbsp; luck
              <span style={hILeftParamStyle.statusParamNum}>{Math.ceil(Number(gene.slice(12,15)) / 100)}</span>
            </p>
          </div>
          <div style={hILeftParamStyle.sireAndRaceNum}>
            <p style={hILeftParamStyle.sireRaceNumP}>Remaining Sire Number<span style={hILeftParamStyle.statusParamNum}>{this.props.sireIndex}</span></p>
            <p style={hILeftParamStyle.sireRaceNumP}>Remaining Race Number<span style={hILeftParamStyle.statusParamNum}>{this.props.raceIndex}</span></p>
          </div>
        </div>
    )
  }
}

export default HorseInfoLeftParameters
