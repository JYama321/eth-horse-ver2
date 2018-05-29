import React, { Component } from 'react'
import { parentsInfoStyle } from "./parentsInfoStyle"
import HorseImage from '../../components/HorseImage/'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Parent extends Component {
  static propTypes={
    gene: PropTypes.string.isRequired,
    sireIndex: PropTypes.number.isRequired,
    raceIndex: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    horseId: PropTypes.number.isRequired
  };
  render () {
    const gene = this.props.gene.slice(this.props.gene.length-15,this.props.gene.length);
    return (
        <div style={parentsInfoStyle.parentInnerContainer}>
          <Link to={'/horses/' + this.props.horseId}>
            <div style={parentsInfoStyle.parentImgContainer}>
              <HorseImage type='parents' horseGene={this.props.gene}/>
            </div>
          </Link>
          <p style={parentsInfoStyle.parentNameContainer}>
            {this.props.name}
          </p>
          <div style={parentsInfoStyle.parentStatusContainer}>
            <p style={parentsInfoStyle.parentStatusP}>strength <span style={parentsInfoStyle.parentStatusNum}>{Math.ceil(Number(gene.slice(0,3)) / 100)}</span></p>
            <p style={parentsInfoStyle.parentStatusP}>speed <span style={parentsInfoStyle.parentStatusNum}>{Math.ceil(Number(gene.slice(3,6)) / 100)}</span></p>
            <p style={parentsInfoStyle.parentStatusP}>stamina <span style={parentsInfoStyle.parentStatusNum}>{Math.ceil(Number(gene.slice(6,9)) / 100)}</span></p>
            <p style={parentsInfoStyle.parentStatusP}>intelligence <span style={parentsInfoStyle.parentStatusNum}>{Math.ceil(Number(gene.slice(9,12)) / 100)}</span></p>
            <p style={parentsInfoStyle.parentStatusP}>luck <span style={parentsInfoStyle.parentStatusNum}>{Math.ceil(Number(gene.slice(12,15)) / 100)}</span></p>
          </div>
          <div style={parentsInfoStyle.parentSireRaceNumContainer}>
            <p style={parentsInfoStyle.parentStatusP}>Remaining Sire Num <span style={parentsInfoStyle.parentStatusNum}>{this.props.sireIndex}</span></p>
            <p style={parentsInfoStyle.parentStatusP}>Remaining Race Num <span style={parentsInfoStyle.parentStatusNum}>{this.props.raceIndex}</span></p>
          </div>
        </div>
    )
  }
}
