import React, { Component } from 'react'
import {horseInfoLeftBottom} from "./horseInfoLeftBottom";
import PropTypes from 'prop-types'
import { mapGeneToTextureName } from '../../utils/mapGeneToTextures'

class HorseInfoLeftBottom extends Component{
  static propTypes={
    gene: PropTypes.string.isRequired
  };
  render () {
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
                <img src={require('../../assets/texture_icons/a.png')} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(this.props.gene)[0]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Hair /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require('../../assets/texture_icons/a.png')} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(this.props.gene)[1]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Body /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require('../../assets/texture_icons/a.png')} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(this.props.gene)[2]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Legs /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require('../../assets/texture_icons/a.png')} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(this.props.gene)[3]} /
                &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={horseInfoLeftBottom.bottomRankImg}/>
                &nbsp;rarity normal
              </p>
            </div>
            <div style={horseInfoLeftBottom.bottomTexContainer}>
              <p style={horseInfoLeftBottom.bottomTexTop}>Back Hair /</p>
              <p style={horseInfoLeftBottom.bottomTexText}>
                <img src={require('../../assets/texture_icons/a.png')} style={horseInfoLeftBottom.bottomIconImg}/>
                &nbsp;{mapGeneToTextureName(this.props.gene)[4]} /
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
