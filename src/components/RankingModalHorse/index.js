import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rankStyles } from "./styles";
import HorseImage from '../../components/HorseImage'
import { horseStatus } from "../../utils/functions";
import {returnRarity} from "../../utils/mapHorseInfoToRarity";
import { getTokenOwner } from '../../utils/eth-function'
import { Link } from 'react-router-dom'

class RankingModalHorse extends Component{
    static propTypes = {
        horseInfo: PropTypes.array.isRequired,
        rank: PropTypes.number.isRequired,
        totalPrize: PropTypes.number.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            isOwner: false
        }
    }
    componentDidMount(){
        const self = this;
        getTokenOwner(this.props.horseInfo[0].toNumber()).then(result => {
            self.setState({
                isOwner: result === window.web3.eth.coinbase
            })
        })
    }
    rankHorseBack(rank){
        switch (rank){
            case 1:
                return 'rank-modal-horse-back1';
            case 2:
                return 'rank-modal-horse-back2';
            case 3:
                return 'rank-modal-horse-back3';
            default:
                return 'rank-modal-horse-back'
        }
    }
    renderStars(rarityLevel,level){
        let stars = [];
        switch (rarityLevel) {
            case 1:
                for(var i=0;i<1;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <div style={{
                    fontSize: '12px',
                    color: level === 2 ? 'rgb(104,134,184)' : 'rgb(156,229,225)'
                }} className='rank-modal-stars' >{stars} lev.{level}</div>;
            case 2:
                for(var i=0;i<2;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <div style={{
                    fontSize: '12px',
                    color: level === 4 ? 'rgb(241,167,186)' : 'rgb(139,134,202)'
                }} className='rank-modal-stars'>{stars} lev.{level}</div>;
            case 3:
                for(var i=0;i<3;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <div style={{
                    fontSize: '12px',
                    color: level === 6 ? 'rgb(239,139,106)' : 'rgb(233,94,190)'
                }} className='rank-modal-stars'>{stars} lev.{level}</div>;
            case 4:
                for(var i=0;i<4;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <div style={{
                    fontSize: '12px',
                    color: level === 8 ? 'rgb(249,198,51)' : 'rgb(237,109,51)'
                }} className='rank-modal-stars'>{stars} lev.{level}</div>;
            case 5:
                for(var i=0;i<5;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <div style={{
                    fontSize: '12px',
                    color: level === 10 ? 'rgb(0,28,113)' : 'rgb(234,63,51)'
                }} className='rank-modal-stars'>{stars} lev.{level}</div>;
            default:
                return null
        }
    }
    render(){
        const gene = this.props.horseInfo[1].c.join(',').replace(/,/g,'');
        const slicedGene = gene.slice(gene.length - 15, gene.length);
        const winCount = this.props.horseInfo[3].toNumber();
        const strength = horseStatus(slicedGene).powerTotal;
        const totalPrize = this.props.totalPrize;
        const {rank} = this.props;
        const horseBack = this.rankHorseBack(rank);
        const mateRaceIndex = Math.ceil((this.props.horseInfo[6].toNumber() + this.props.horseInfo[7].toNumber()) / 10);
        const rarity = returnRarity(gene) + mateRaceIndex;
        const horseId = this.props.horseInfo[0].toNumber();
        return (
            <div style={rankStyles.container(this.state.isOwner)}>
                <div style={rankStyles.rankNumber}>
                    {rank}
                </div>
                <div style={rankStyles.horseImageContainer} className={horseBack} >
                    <Link to={"/horses/" + horseId}>
                        <HorseImage type={'rank-modal'} horseGene={gene}/>
                    </Link>
                </div>
                <div style={rankStyles.horseName}>
                    {this.props.horseInfo[2]}
                </div>
                <div style={rankStyles.winCountContainer}>
                    {winCount}
                </div>
                <div style={rankStyles.totalPrizeContainer}>
                    {totalPrize}
                </div>
                <div style={rankStyles.rarityContainer}>
                    {this.renderStars(Math.ceil(rarity / 2),rarity)}
                </div>
                <div style={rankStyles.strengthContainer}>
                    {strength}
                </div>
            </div>
        )
    }
}

export default RankingModalHorse
