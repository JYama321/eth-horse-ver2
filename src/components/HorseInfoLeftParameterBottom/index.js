import React, { Component } from 'react'
import {horseInfoLeftBottom} from "./horseInfoLeftBottom";
import PropTypes from 'prop-types'
import { mapGeneToTextureName,mapGeneToTexture } from '../../utils/mapGeneToTextures'

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
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Head /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require(`../../assets/texture_icons/${mapGeneToTexture(gene)[0].slice(0,1)}.png`)} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(gene)[0]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Hair /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require(`../../assets/texture_icons/${mapGeneToTexture(gene)[1].slice(0,1)}.png`)} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(gene)[1]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Body /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require(`../../assets/texture_icons/${mapGeneToTexture(gene)[2].slice(0,1)}.png`)} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(gene)[2]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Legs /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require(`../../assets/texture_icons/${mapGeneToTexture(gene)[3].slice(0,1)}.png`)} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(gene)[3]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Back Hair /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require(`../../assets/texture_icons/${mapGeneToTexture(gene)[4].slice(0,1)}.png`)} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(gene)[4]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
          </div>
        </div>
    )
  }
}

export default HorseInfoLeftBottom;
