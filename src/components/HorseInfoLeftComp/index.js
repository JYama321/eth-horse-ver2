import React, { Component } from 'react'
import {horseInfoLeftStyle} from './HorseInfoLeftStyle'
import HorseInfoLeftParameters from '../HorseInfoLeftParameters/'
import HorseInfoLeftBottom from '../../components/HorseInfoLeftParameterBottom'
import PropTypes from 'prop-types'

class HorseInfoLeft extends Component{
  static propTypes={
    horseInfo: PropTypes.array.isRequired
  };
  render(){
    const name = this.props.horseInfo[2];
    const gene = this.props.horseInfo[1].c.join(',').replace(/,/g,'');
    const sireIndex = this.props.horseInfo[6].toNumber();
    const raceIndex = this.props.horseInfo[7].toNumber();
    return (
        <div style={horseInfoLeftStyle.outerContainer}>
          <div style={horseInfoLeftStyle.top}>
            <p style={horseInfoLeftStyle.horseNameP}>{name}</p>
          </div>
          <div style={horseInfoLeftStyle.middle}>
            <HorseInfoLeftParameters
                gene={gene}
                sireIndex={sireIndex}
                raceIndex={raceIndex}
            />
          </div>
          <div style={horseInfoLeftStyle.bottom}>
            <HorseInfoLeftBottom
                gene={gene}
            />
          </div>
        </div>
    )
  }
}

export default HorseInfoLeft
