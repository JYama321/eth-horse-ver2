import React,{Component} from 'react';
import HorseImage from '../HorseImage/'
import {styles,STYLE,modalStyle} from './styles';
import { Link } from 'react-router-dom';
import {horseStatus} from "../../utils/functions";
import { returnRarity, returnClassName } from "../../utils/mapHorseInfoToRarity";
import PropTypes from 'prop-types'
import { buyHorse } from "../../utils/eth-function";

export default class HorseStatusCard extends Component{
  static propTypes = {
    info: PropTypes.array.isRequired,
    isMyHorse: PropTypes.bool,
    isLeft: PropTypes.bool,
    isSire: PropTypes.bool,
  };
  constructor(props){
    super(props);
    this.state={
      isOpenSireModal: false
    }
  }
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
  buyHorse(horseId,price){
    console.log(this.props.history)
    if(this.props.isSire){
      this.props.history.push('/market-place/sire/' + horseId)
    }else{
      buyHorse(horseId,price)
    }
  }

  render(){
    const horseId = this.props.info[0].toNumber();
    const mateRaceIndex = Math.ceil((this.props.info[6].toNumber() + this.props.info[7].toNumber()) / 10);
    const price = this.props.isSire ? window.web3.fromWei(this.props.info[9], 'ether') : window.web3.fromWei(this.props.info[8],'ether');
    const isSire = this.props.isSire;
    const gene = this.props.info[1].c.join(',').replace(/,/g,'');
    const rarity = returnRarity(gene) + mateRaceIndex;
    const horseBack = returnClassName(rarity);
    return(
        <div style={styles(this.props).horseStatusCard}>
          <div style={STYLE.horseImageBack} className={horseBack}>
            <div
                className='horse-price-imgae'
                style={STYLE.horsePriceImg}
            >{price.toFixed(3)} ETH</div>
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
            {this.renderStars(Math.ceil(rarity/2),rarity)}
          </div>
          <button style={STYLE.buyButton} className='market-buy-button' onClick={()=>this.buyHorse(horseId,price)}>
            {isSire ? 'Sire' : 'Buy'}
          </button>
        </div>
    )
  }
}
