import React, {Component} from 'react'
import HorseImage from '../HorseImage/'
import * as functions from '../../utils/functions'
import daen from '../../assets/static_assets/daen.png'


class RaceAppliedHorseList extends Component {
  returnStatus(){
    const gene = this.props.gene;
    const status = gene.slice(gene.length-15,gene.length);
    return functions.horseStatus(status)
  }
  render(){
    return(
        <div className="apply-horse-container">
          <HorseImage
              type="normal"
              horseGene={this.props.gene}
          />
          <p>{this.props.name}</p>
          <div className="horse-poser-diagram">
            <span className="strength-param" style={{width: `${Math.ceil(this.returnStatus().params[0] / 1000 * 20)}%` }}></span>
            <span className="speed-param" style={{width: `${Math.ceil(this.returnStatus().params[1] / 1000 * 20)}%` }}></span>
            <span className="stamina-param" style={{width: `${Math.ceil(this.returnStatus().params[2] / 1000 * 20)}%` }}></span>
            <span className="intelligence-param" style={{width: `${Math.ceil(this.returnStatus().params[3] / 1000 * 20)}%` }}></span>
            <span className="luck-param" style={{width: `${Math.ceil(this.returnStatus().params[4] / 1000 * 20)}%` }}></span>
          </div>
          <div className="total-power-apply">
            <p>power total</p>
            <p className="horse-poser-num-apply">{this.returnStatus().powerTotal}</p>
            <img
                className="power-total-image-apply"
                src={daen}
            />

          </div>
        </div>
    )
  }
}

export default RaceAppliedHorseList;
