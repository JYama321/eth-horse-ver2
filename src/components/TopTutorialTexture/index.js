import React, { Component } from 'react'
import {tutorialTextureStyles} from "./styles";
import { mapEnToTextureNames } from "../../utils/mapGeneToTextures";

const textureAlphabets =
    ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y'];
const texturesA = ['q','k','v'];
const texturesB = ['p','l','m','n','o'];
const texturesC = ['a','b','c','d','f','g','h','i','j','r','s','t','u','w','y'];

class TopTutorialTextures extends Component{
  renderSuperRareTextures(){
    return texturesA.map((elem,index) => {
      return (
          <div style={tutorialTextureStyles.textureIconContainer} key={'texture' + index}>
            <img
                width="60px"
                height="60px"
                style={tutorialTextureStyles.textureIconStyle}
                src={require('../../assets/texture_icons/' + elem + '.png')}
            />
            <p>{mapEnToTextureNames.en[elem]}</p>
          </div>
      )
    })
  }

  renderRareTextures(){
    return texturesB.map((elem,index) => {
      return (
          <div style={tutorialTextureStyles.textureIconContainer}>
            <img
                width="60px"
                height="60px"
                style={tutorialTextureStyles.textureIconStyle}
                src={require('../../assets/texture_icons/' + elem + '.png')}
                key={'texture'+index}
            />
            <p>{mapEnToTextureNames.en[elem]}</p>
          </div>
      )
    })
  }

  renderNormalTexture(){
    return texturesC.map((elem,index) => {
      return (
          <div style={tutorialTextureStyles.textureIconContainer}>
            <img
                width="60px"
                height="60px"
                style={tutorialTextureStyles.textureIconStyle}
                src={require('../../assets/texture_icons/' + elem + '.png')}
            />
            <p>{mapEnToTextureNames.en[elem]}</p>
          </div>
      )
    })
  }
  render(){
    return(
        <div style={tutorialTextureStyles.container}>
          <div style={tutorialTextureStyles.textureRankWrapper}>
            <p style={tutorialTextureStyles.textureRareLevel}>Super Rare</p>
            {this.renderSuperRareTextures()}
          </div>
          <div style={tutorialTextureStyles.textureRankWrapper}>
            <p style={tutorialTextureStyles.textureRareLevel}>Rare</p>
            {this.renderRareTextures()}
          </div>
          <div style={tutorialTextureStyles.textureRankWrapperNormal}>
            <p style={tutorialTextureStyles.textureRareLevel}>Normal</p>
            {this.renderNormalTexture()}
          </div>
        </div>
    )

  }

}

export default TopTutorialTextures
