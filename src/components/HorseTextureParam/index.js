import React from 'react'
import {mapGeneToTexture, mapGeneToTextureName} from "../../utils/mapGeneToTextures";
import PropTypes from 'prop-types'

export default function HorseTextureParam(props){
  return (
      <div style={props.style}>
        <p style={styles.bottomTexTop}>{types[props.num]} /</p>
        <p style={styles.bottomTexText}>
          <img src={require(`../../assets/texture_icons/${mapGeneToTexture(props.gene)[props.num].slice(0,1)}.png`)} style={styles.bottomIconImg}/>
          &nbsp;{mapGeneToTextureName(props.gene)[props.num]} /
          &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={styles.bottomRankImg}/>
          &nbsp;rarity normal
        </p>
      </div>
  )
}

HorseTextureParam.propTypes={
  style: PropTypes.object.isRequired,
  gene: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
};

const types = ['Head', 'Hair', 'Body', 'Legs', 'Back Hair'];

const styles={
  bottomTexTop: {
    fontSize: '18px',
    lineHeight: '30px',
    height: '30px'
  },
  bottomTexText: {
    fontSize: '15px',
    lineHeight: '20px'
  },
  bottomIconImg: {
    width: '15px',
    height: '15px'
  },
  bottomRankImg: {
    width: '20px',
    height: '20px'
  }
};
