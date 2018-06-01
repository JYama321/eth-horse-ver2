import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import daen from '../../assets/static_assets/daen.png';
import {mapGeneToTexture} from "../../utils/mapGeneToTextures";
import {styles,STYLE} from './styles';
import rankKing from '../../assets/static_assets/rank-king.png'
import { Link } from 'react-router-dom';
import {horseStatus} from "../../utils/functions";
import icon from '../../assets/texture_icons/g.png'
import PropTypes from 'prop-types'
const buttonSquare = require('../../assets/static_assets/sq.png');

export default class HorseStatusCard extends Component{
  static propTypes = {
    info: PropTypes.array.isRequired,
    isMyHorse: PropTypes.bool,
    isLeft: PropTypes.bool
  }
  buyHorse(){

  }
  returnStatus(){
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const status = gene.slice(gene.length-15,gene.length);
    return horseStatus(status)
  }
  render(){
    if(this.props.isMyHorse){
      return(
          <div style={styles(this.props).horseStatusCard}>
            <div style={STYLE.horseImageBack} className='horse-back'>
              <Link to={"/horses/" + this.props.info[0].toNumber()}>
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
    }else{
      return(
          <div  style={styles(this.props).horseStatusCard}>
            <Link to={"/horses/" + this.returnId()}>
              <HorseImage
                  type="normal"
                  horseGene={this.props.info ? this.props.info[1].c.join(',').replace(/,/g,'') : undefined}
              />
            </Link>
            <div className="horse-status-myhorse">
              <b style={STYLE.horseName}>{this.props.info ? this.props.info[2] : ''}</b>
              <div style={styles(this.props).powerTotal}>
                <p style={styles(this.props).powerTotalP}>power total: {this.returnStatus().powerTotal}</p>
              </div>
              <div className="horse-rank-stats">
                <img
                    src={rankKing}
                />
                <p style={STYLE.horseStatsP}>Rarity high / Type pair</p>
              </div>
              <div style={STYLE.horseStats}>
                <p>Current Price &nbsp; {this.props.info ? window.web3.fromWei(this.props.info[8].toFixed(3)) : '???'} ETH</p>
              </div>
              <button className="buy-button" onClick={()=>this.buyHorse()}>
                buy
              </button>
            </div>
          </div>
      )
    }
  }
}
