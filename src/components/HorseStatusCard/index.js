import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import {styles,STYLE} from './styles';
import { Link } from 'react-router-dom';
import {horseStatus} from "../../utils/functions";
import { returnRarity, returnClassName } from "../../utils/mapHorseInfoToRarity";
import PropTypes from 'prop-types'

export default class HorseStatusCard extends Component{
  static propTypes = {
    info: PropTypes.array.isRequired,
    isLeft: PropTypes.bool,
    horsePrice: PropTypes.string,
    isTicketModal: PropTypes.bool
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
            color: level === 2 ? 'rgb(104,134,184)' : 'rgb(156,229,225)'
        }} className='horse-star-base'>{stars} lev.{level}</div>;
      case 2:
        for(var i=0;i<2;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 4 ? 'rgb(241,167,186)' : 'rgb(139,134,202)'
        }} className='horse-star-base'>{stars} lev.{level}</div>;
      case 3:
        for(var i=0;i<3;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 6 ? 'rgb(239,139,106)' : 'rgb(233,94,190)'
        }} className='horse-star-base'>{stars} lev.{level}</div>;
      case 4:
        for(var i=0;i<4;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          fontSize: '12px',
          color: level === 8 ? 'rgb(249,198,51)' : 'rgb(237,109,51)'
        }} className='horse-star-base'>{stars} lev.{level}</div>;
      case 5:
        for(var i=0;i<5;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
            fontSize: '10px',
            textAlign: 'right',
          color: level === 10 ? 'rgb(0,28,113)' : 'rgb(234,63,51)'
        }} className='horse-star-base'>{stars} lev.{level}</div>;
      default:
        return null
    }
  }

  render() {
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const mateRaceIndex = Math.ceil((this.props.info[6].toNumber() + this.props.info[7].toNumber()) / 10);
    const rarity = returnRarity(gene) + mateRaceIndex;
    const horseBack = returnClassName(rarity);
    return (
        <div style={styles(this.props).horseStatusCard}>
          <div style={STYLE.horseImageBack} className={horseBack}>
            <Link to={"/horses/" + this.props.info[0].toNumber()}>
              <HorseImage
                  type="normal"
                  horseGene={this.props.info ? this.props.info[1].c.join(',').replace(/,/g, '') : undefined}
              />
            </Link>
            <div style={styles(this.props).powerTotal}>
              <p style={styles(this.props).powerTotalP}>power total: {this.returnStatus().powerTotal}</p>
            </div>
          </div>
          <div style={styles(this.props).horseStatus}>
            <div style={STYLE.horseName}><b>{this.props.info ? this.props.info[2] : ''}</b></div>
            {this.renderStars(Math.ceil(rarity/2),rarity)}
          </div>
        </div>
    )
  }
}
