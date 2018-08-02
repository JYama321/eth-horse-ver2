import React from 'react'
import {mapGeneToTexture, mapGeneToTextureName} from "../../utils/mapGeneToTextures";
import { mapTextureToRarity } from "../../utils/mapHorseInfoToRarity";
import PropTypes from 'prop-types'

export default function HorseTextureParamSire(props){
  const textureName = mapGeneToTexture(props.gene)[props.num].slice(0,1);
  const texRarity = mapTextureToRarity(textureName);
  let rankImage;
  switch (texRarity){
    case 'normal':
      rankImage = 'rarity-low';
      break;
    case 'Rare':
      rankImage = 'rarity-normal';
      break;
    case 'Super Rare':
      rankImage = 'rarity-high';
      break;
    default:
      rankImage = 'rarity-low';
      break;
  }
  return (
      <div style={props.style}>
        <p style={styles.bottomTexText}>
          {types[props.num]}/
          <span style={styles.texRight}>
          <img src={`https://image.eth-horse.com/texture_icons/${textureName}.png`} style={styles.bottomIconImg}/>
            &nbsp;&nbsp;{mapGeneToTextureName(props.gene)[props.num]}
            &nbsp;<img src={`https://image.eth-horse.com/static_assets/${rankImage}.png`} style={styles.bottomRankImg}/>
            &nbsp;<span style={styles.rarityTex}>rarity {texRarity}</span>
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
