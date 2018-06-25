import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import daen from '../../assets/static_assets/daen.png';
import {styles,STYLE} from './styles';
import rankKing from '../../assets/static_assets/rank-king.png'
import { Link } from 'react-router-dom';
import {horseStatus} from "../../utils/functions";
import PropTypes from 'prop-types';
const img = require('../../assets/static_assets/triangle.png');
import icon from '../../assets/texture_icons/g.png'
export default class HorseRankStatusCard extends Component{
  static propTypes = {
    isMyHorse: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    isLeft: PropTypes.bool.isRequired,
    rank: PropTypes.number.isRequired,
    number: PropTypes.number,
    type: PropTypes.string.isRequired
  };

  returnStatus(){
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const status = gene.slice(gene.length-15,gene.length);
    return horseStatus(status)
  }
  render(){
    const horseId = this.props.info[0].toNumber();
    let number;
    switch (this.props.type){
      case 'strength':
        number = this.props.number;
        break;
      case 'win-count':
        number = this.props.number + ' win';
        break;
      case 'total-prize':
        number = this.props.number + ' ETH';
        break;
      default:
        break;
    }
    return(
        <div style={styles(this.props).horseStatusCard}>
          <div style={STYLE.horseImageBack} className='horse-back'>
            <div
                className='horse-price-imgae'
                style={STYLE.horsePriceImg}
            >{number}</div>
            <Link to={"/horses/" + horseId}>
              <HorseImage
                  type="normal"
                  horseGene={this.props.info ? this.props.info[1].c.join(',').replace(/,/g,'') : undefined}
              />
            </Link>
            <div style={styles(this.props).powerTotal}>
              <p style={styles(this.props).powerTotalP}>power total: {this.returnStatus().powerTotal}</p>
            </div>
          </div>
          <div style={styles(this.props).horseStatus}>
            <div style={STYLE.horseName}><b>{this.props.info ? this.props.info[2] : ''}</b></div>
            <div style={STYLE.horseStats}>
              <img
                  src={icon}
                  style={STYLE.iconImg}
              />
              <img
                  src={rankKing}
                  style={STYLE.rankImg}
              />
            </div>
          </div>
        </div>
    )
  }
}
