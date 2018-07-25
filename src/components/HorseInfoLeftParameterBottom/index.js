import React, { Component } from 'react'
import {horseInfoLeftBottom} from "./horseInfoLeftBottom";
import PropTypes from 'prop-types'
import HorseTextureParam from '../HorseTextureParam'
import {returnRarity} from "../../utils/mapHorseInfoToRarity";


class HorseInfoLeftBottom extends Component{
  static propTypes={
    gene: PropTypes.string.isRequired,
    mateRaceIndex: PropTypes.number.isRequired
  };
  renderStars(rarityLevel,level){
    let stars = [];
    switch (rarityLevel) {
      case 1:
        for(var i=0;i<1;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 2 ? 'rgb(104,134,184)' : 'rgb(156,229,225)'
        }} className='info-horse-stars'>Rarity/ {stars} lev.{level}</div>;
      case 2:
        for(var i=0;i<2;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 4 ? 'rgb(241,167,186)' : 'rgb(139,134,202)'
        }} className='info-horse-stars'>Rarity/ {stars} lev.{level}</div>;
      case 3:
        for(var i=0;i<3;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 6 ? 'rgb(239,139,106)' : 'rgb(233,94,190)'
        }} className='info-horse-stars'>Rarity/ {stars} lev.{level}</div>;
      case 4:
        for(var i=0;i<4;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          color: level === 8 ? 'rgb(249,198,51)' : 'rgb(237,109,51)'
        }} className='info-horse-stars'>Rarity/ {stars} lev.{level}</div>;
      case 5:
        for(var i=0;i<5;i++){
          stars.push(<span key={i+'star'}>★</span>)
        }
        return <div style={{
          fontSize: '16px',
          color: level === 10 ? 'rgb(0,s28,113)' : 'rgb(234,63,51)'
        }} className='info-horse-stars'>Rarity/ {stars} lev.{level}</div>;
      default:
        return null
    }
  }
  render () {
    const gene = this.props.gene.slice(this.props.gene.length-38,this.props.gene.length - 20);
    const rarity = returnRarity(this.props.gene) + this.props.mateRaceIndex;
    return (
        <div style={horseInfoLeftBottom.container}>
          <p style={horseInfoLeftBottom.placeText}>attributes/</p>
          {this.renderStars(Math.ceil(rarity / 2), rarity)}
          <div style={horseInfoLeftBottom.bottomTextureName}>
            <HorseTextureParam style={horseInfoLeftBottom.bottomTexContainer} gene={gene} num={0} type='Head'/>
            <HorseTextureParam style={horseInfoLeftBottom.bottomTexContainer} gene={gene} num={1} type='Hair'/>
            <HorseTextureParam style={horseInfoLeftBottom.bottomTexContainer} gene={gene} num={2} type='Body'/>
            <HorseTextureParam style={horseInfoLeftBottom.bottomTexContainer} gene={gene} num={3} type='Legs'/>
            <HorseTextureParam style={horseInfoLeftBottom.bottomTexContainer} gene={gene} num={4} type='Back Hair'/>
          </div>
        </div>
    )
  }
}

export default HorseInfoLeftBottom;
