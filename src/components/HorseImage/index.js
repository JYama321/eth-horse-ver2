import React,{Component} from 'react'
import {mapGeneToTexture} from "../../utils/mapGeneToTextures";
import {styles} from './styles'
import origin from '../../assets/textures/origins/origin1_2.png'
import PropTypes from 'prop-types'


class HorseImage extends Component{
  static propTypes = {
    type: PropTypes.string.isRequired,
    horseGene: PropTypes.string.isRequired
  };
  constructor(props){
    super(props);
    this.cryReg = /4.*/;
    this.angryReg = /3.*/;
  }
  returnTextureGene(){
    const gene = this.props.horseGene;
    const status = gene.slice(gene.length-38,gene.length - 20);
    return status
  }
  returnTextureType(texStr){
    if(texStr.match(this.cryReg) !== null || texStr.match(this.cryReg)){
      return styles.horseImageCry;
    }else if(texStr.match(this.angryReg) !== null || texStr.match(this.angryReg)){
      return styles.horseImageAngry;
    }else{
      return styles.horseImageBase;
    }
  }
  render(){
    if(this.props.horseGene != undefined){
      return(
          <div style={styles.horseImageContainer(this.props.type)}>
            <img
                style={styles.horseImageBase.origin}
                src={require(`../../assets/origins/origin${mapGeneToTexture(this.returnTextureGene())[5]}_2.png`)}
            />
            <img
                style={this.returnTextureType(String(mapGeneToTexture(this.returnTextureGene())[5])).face}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[0]}.png`)}
            />
            <img
                style={this.returnTextureType(String(mapGeneToTexture(this.returnTextureGene())[5])).hair}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[1]}.png`)}
            />
            <img
                style={this.returnTextureType(String(mapGeneToTexture(this.returnTextureGene())[5])).body}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[2]}3.png`)}
            />
            <img
                style={this.returnTextureType(String(mapGeneToTexture(this.returnTextureGene())[5])).frontLeg}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[3]}4.png`)}
            />
            <img
                style={styles.horseImageBase.backLeg}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[3]}5.png`)}
            />
            <img
                style={styles.horseImageBase.tail}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[4]}6.png`)}
            />
          </div>)
    }else{
      return(
          <div className={"now-wanted-horse horse-image-container-" + this.props.type}>
            <img
                style={styles.horseImageBase.origin}
                src={origin}
            />
            <span className="wanted">Horse Empty</span>
          </div>
      )
    }
  }
}

export default HorseImage;
