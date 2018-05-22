import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import daen from '../../assets/static_assets/daen.png';
import {styles,STYLE} from './styles';
import rankKing from '../../assets/static_assets/rank-king.png'
import { Link } from 'react-router-dom';
import {horseStatus} from "../../utils/functions";

export default class HorseStatusCard extends Component{
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
            <Link to={"/horses/" + this.props.info[0].toNumber()}>
              <HorseImage
                  type="normal"
                  horseGene={this.props.info ? this.props.info[1].c.join(',').replace(/,/g,'') : undefined}
              />
            </Link>
            <div style={styles(this.props).horseStatus}>
              <b style={STYLE.horseName}>{this.props.info ? this.props.info[2] : ''}</b>
              <div style={styles(this.props).powerTotal}>
                <p style={styles(this.props).powerTotalP}>power total</p>
                <p style={STYLE.powerNum}>{this.returnStatus().powerTotal}</p>
                <img
                    style={styles(this.props).powerImg}
                    src={daen}
                />
              </div>
              <div style={STYLE.horsePowerDiagram}>
                <span className="strength-param" style={STYLE.strengthParam(Math.ceil(this.returnStatus().params[0] / 1000 * 20))}></span>
                <span className="speed-param" style={STYLE.speedParam(Math.ceil(this.returnStatus().params[1] / 1000 * 20))}></span>
                <span className="stamina-param" style={STYLE.staminaParam(Math.ceil(this.returnStatus().params[2] / 1000 * 20))}></span>
                <span className="intelligence-param" style={STYLE.intelligenceParam(Math.ceil(this.returnStatus().params[3] / 1000 * 20))}></span>
                <span className="luck-param" style={STYLE.luckParam(Math.ceil(this.returnStatus().params[4] / 1000 * 20))}></span>
              </div>
              <div style={STYLE.horseStats}>
                <img
                    src={rankKing}
                />
                <p style={STYLE.horseStatsP}>Rarity high / Type pair</p>
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
                <p style={styles(this.props).powerTotalP}>power total</p>
                <p style={STYLE.powerNum}>{this.returnStatus().powerTotal}</p>
                <img
                    style={styles(this.props).powerImg}
                    src={daen}
                />
              </div>
              <div style={STYLE.horsePowerDiagram}>
                <span className="strength-param" style={STYLE.strengthParam(Math.ceil(this.returnStatus().params[0] / 1000 * 20))}></span>
                <span className="speed-param" style={STYLE.speedParam(Math.ceil(this.returnStatus().params[1] / 1000 * 20))}></span>
                <span className="stamina-param" style={STYLE.staminaParam(Math.ceil(this.returnStatus().params[2] / 1000 * 20))}></span>
                <span className="intelligence-param" style={STYLE.intelligenceParam(Math.ceil(this.returnStatus().params[3] / 1000 * 20))}></span>
                <span className="luck-param" style={STYLE.luckParam(Math.ceil(this.returnStatus().params[4] / 1000 * 20))}></span>
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
