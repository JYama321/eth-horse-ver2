import React from 'react'
import {mapGeneToTexture, mapGeneToTextureName} from "../../utils/mapGeneToTextures";
import { mapTextureToRarity } from "../../utils/mapHorseInfoToRarity";
import PropTypes from 'prop-types'

export default function HorseTextureParamSire(props){
  const textureName = mapGeneToTexture(props.gene)[props.num].slice(0,1);
  return (
      <div style={props.style}>
        <p style={styles.bottomTexText}>
          {types[props.num]}&nbsp;/
          <span style={styles.texRight}>
          <img src={require(`../../assets/texture_icons/${textureName}.png`)} style={styles.bottomIconImg}/>
            &nbsp;&nbsp;{mapGeneToTextureName(props.gene)[props.num]}
            &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={styles.bottomRankImg}/>
            &nbsp;<span style={styles.rarityTex}>rarity {mapTextureToRarity(textureName)}</span>
          </span>
        </p>
      </div>
  )
}

HorseTextureParamSire.propTypes={
  style: PropTypes.object.isRequired,
  gene: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
};

const types = ['Head', 'Hair', 'Body', 'Legs', 'Back Hair'];

const styles={
  bottomTexText: {
    fontSize: '15px',
    lineHeight: '20px',
    position: 'relative'
  },
  bottomIconImg: {
    width: '15px',
    height: '15px',
    right: '5px'
  },
  bottomRankImg: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    left: '160px'
  },
  texRight: {
    position: 'absolute',
    left: '85px',
    fontSize: '12px',
  },
  rarityTex: {
    position: 'absolute',
    left: '180px',
    width: '90px',
    height: '15px'
  }
};
