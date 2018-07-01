import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import {styles,STYLE} from './styles';
import rankKing from '../../assets/static_assets/rank-king.png'
import {horseStatus} from "../../utils/functions";
import icon from '../../assets/texture_icons/g.png'
import PropTypes from 'prop-types'
import {returnClassName, returnRarity} from "../../utils/mapHorseInfoToRarity";

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
  renderStars(rarityLevel,level){
    let stars = [];
    switch (rarityLevel) {
      case 1:
        for(var i=0;i<1;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          height: '30px',
          width: '35%',
          lineHeight: '30px',
          position: 'relative',
          fontSize: '12px',
          color: level === 2 ? 'rgb(104,134,184)' : 'rgb(156,229,225)'
        }}>{stars} lev.{level}</div>;
      case 2:
        for(var i=0;i<2;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          height: '30px',
          width: '35%',
          lineHeight: '30px',
          position: 'relative',
          fontSize: '12px',
          color: level === 4 ? 'rgb(241,167,186)' : 'rgb(139,134,202)'
        }}>{stars} lev.{level}</div>;
      case 3:
        for(var i=0;i<3;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          height: '30px',
          width: '35%',
          position: 'relative',
          lineHeight: '30px',
          fontSize: '12px',
          color: level === 6 ? 'rgb(239,139,106)' : 'rgb(233,94,190)'
        }}>{stars} lev.{level}</div>;
      case 4:
        for(var i=0;i<4;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          height: '30px',
          width: '35%',
          position: 'relative',
          lineHeight: '30px',
          fontSize: '10px',
          color: level === 8 ? 'rgb(249,198,51)' : 'rgb(237,109,51)'
        }}>{stars} lev.{level}</div>;
      case 5:
        for(var i=0;i<5;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          height: '30px',
          width: '35%',
          position: 'relative',
          lineHeight: '30px',
          fontSize: '10px',
          color: level === 10 ? 'rgb(0,28,113)' : 'rgb(234,63,51)'
        }}>{stars} lev.{level}</div>;
      default:
        return null
    }
  }

  render() {
    const horseId = this.props.info[0].toNumber();
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const mateRaceIndex = Math.ceil((this.props.info[6].toNumber() + this.props.info[7].toNumber()) / 10);
    const rarity = returnRarity(gene) + mateRaceIndex;
    const horseBack = returnClassName(rarity);
    return (
        <div style={styles(this.props).horseStatusCard} onClick={()=>this.props.selectHorse(horseId)}>
          <div style={STYLE.horseImageBack} className={horseBack}>
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
            {this.renderStars(Math.ceil(rarity / 2),rarity)}
          </div>
        </div>
    )
  }
}
