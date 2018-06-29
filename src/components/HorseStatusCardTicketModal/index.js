import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import {styles,STYLE} from './styles';
import rankKing from '../../assets/static_assets/rank-king.png'
import {horseStatus} from "../../utils/functions";
import icon from '../../assets/texture_icons/g.png'
import PropTypes from 'prop-types'

export default class HorseStatusCardTicketModal extends Component{
  static propTypes = {
    info: PropTypes.array.isRequired,
    isMyHorse: PropTypes.bool,
    isLeft: PropTypes.bool,
    horsePrice: PropTypes.string,
    isTicketModal: PropTypes.bool,
    selectHorse: PropTypes.func.isRequired,
    isSelected: PropTypes.bool
  };

  returnStatus(){
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const status = gene.slice(gene.length-15,gene.length);
    return horseStatus(status)
  }

  render() {
    const horseId = this.props.info[0].toNumber();
    return (
        <div style={styles(this.props).horseStatusCard} onClick={()=>this.props.selectHorse(horseId)}>
          <div style={STYLE.horseImageBack} className='horse-back'>
            <HorseImage
                type="ticket-modal"
                horseGene={this.props.info ? this.props.info[1].c.join(',').replace(/,/g, '') : undefined}
            />
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
