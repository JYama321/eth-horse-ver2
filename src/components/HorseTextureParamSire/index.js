import React from 'react'
import {mapGeneToTexture, mapGeneToTextureName} from "../../utils/mapGeneToTextures";
import PropTypes from 'prop-types'

export default function HorseTextureParamSire(props){
  return (
      <div style={props.style}>
        <p style={styles.bottomTexText}>
          {types[props.num]}&nbsp;/
          <span style={styles.texRight}>
          <img src={require(`../../assets/texture_icons/${mapGeneToTexture(props.gene)[0].slice(0,1)}.png`)} style={styles.bottomIconImg}/>
            &nbsp;{mapGeneToTextureName(props.gene)[props.num]} /
            &nbsp;<img src={require('../../assets/static_assets/rank-king.png')} style={styles.bottomRankImg}/>
            &nbsp;rarity normal
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
    height: '15px'
  },
  bottomRankImg: {
    width: '15px',
    height: '15px'
  },
  texRight: {
    position: 'absolute',
    left: '100px',
    fontSize: '12px',
  }
};
