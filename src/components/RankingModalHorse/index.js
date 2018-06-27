import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rankStyles } from "./styles";
import HorseImage from '../../components/HorseImage'
import { horseStatus } from "../../utils/functions";

class RankingModalHorse extends Component{
  static propTypes = {
    horseInfo: PropTypes.array.isRequired,
    rank: PropTypes.number.isRequired
  };
  render(){
    const gene = this.props.horseInfo[1].c.join(',').replace(/,/g,'');
    const slicedGene = gene.slice(gene.length - 15, gene.length);
    const winCount = this.props.horseInfo[3].toNumber();
    const strength = horseStatus(slicedGene).powerTotal;
    return (
        <div style={rankStyles.container}>
          <div style={rankStyles.rankNumber}>
            {this.props.rank}
          </div>
          <div style={rankStyles.horseImageContainer} className='rank-modal-horse-back' >
            <HorseImage type={'rank-modal'} horseGene={gene}/>
          </div>
          <div style={rankStyles.horseName}>
            {this.props.horseInfo[2]}
          </div>
          <div style={rankStyles.winCountContainer}>
            {winCount}
          </div>
          <div style={rankStyles.totalPrizeContainer}>
            {strength}
          </div>
          <div style={rankStyles.rarityContainer}>

          </div>
          <div style={rankStyles.strengthContainer}>
            {strength}
          </div>
        </div>
    )
  }
}

export default RankingModalHorse
