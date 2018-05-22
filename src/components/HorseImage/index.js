import React,{Component} from 'react'
import {mapGeneToTexture} from "../../utils/mapGeneToTextures";
import {styles} from './styles'
import origin from '../../assets/textures/origins/origin1_2.png'


class HorseImage extends Component{
  constructor(props){
    super(props);
    this.reg = /4.*/
  }

  returnTextureGene(){
    const gene = this.props.horseGene;
    const status = gene.slice(gene.length-38,gene.length - 20);
    return status
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
                style={String(mapGeneToTexture(this.returnTextureGene())[5]).match(this.reg) ? styles.horseImageCry.face : styles.horseImageBase.face}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[0]}.png`)}
            />
            <img
                style={String(mapGeneToTexture(this.returnTextureGene())[5]).match(this.reg) ? styles.horseImageCry.hair : styles.horseImageBase.hair}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[1]}.png`)}
            />
            <img
                style={String(mapGeneToTexture(this.returnTextureGene())[5]).match(this.reg) ? styles.horseImageCry.body : styles.horseImageBase.body}
                src={require(`../../assets/textures/${mapGeneToTexture(this.returnTextureGene())[2]}3.png`)}
            />
            <img
                style={String(mapGeneToTexture(this.returnTextureGene())[5]).match(this.reg) ? styles.horseImageCry.frontLeg : styles.horseImageBase.frontLeg}
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
