import React, { Component } from 'react'
import {horseInfoLeftBottom} from "./horseInfoLeftBottom";
import PropTypes from 'prop-types'
import HorseTextureParam from '../HorseTextureParam'


class HorseInfoLeftBottom extends Component{
  static propTypes={
    gene: PropTypes.string.isRequired
  };
  render () {
    const gene = this.props.gene.slice(this.props.gene.length-38,this.props.gene.length - 20);
    return (
        <div style={horseInfoLeftBottom.container}>
          <p style={horseInfoLeftBottom.placeText}>attributes/</p>
          <p style={horseInfoLeftBottom.rarity}>
            <img
                style={horseInfoLeftBottom.rarityImg}
                src={require('../../assets/static_assets/rank-king.png')}
            />
            &nbsp;
            Rarity high / Type pair
          </p>
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
