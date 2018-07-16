import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HorseImage from '../HorseImage'
import { raceInfoHorseStyle } from "./styles"
import Modal from 'react-modal'
import {
    getHorseData,
    getBetInfo,
    getOdds,
    betRace,
    getParticipantPantInfo,
    withdrawPayback,
    withdrawPrize,
    getTokenOwner
} from "../../utils/eth-function";
import {horseStatus} from "../../utils/functions";
const loadingGif = require('../../assets/static_assets/umaloading.gif');
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import winImage from '../../assets/static_assets/rarity-high.png'
Modal.setAppElement('#root');

class RaceInfoHorse extends Component {
    static propTypes = {
        horseInfo: PropTypes.object.isRequired,
        horseId: PropTypes.number.isRequired,
        horseNum: PropTypes.number.isRequired,
        getHorseInfo: PropTypes.func.isRequired,
        race: PropTypes.array.isRequired,
        isWanted: PropTypes.bool.isRequired,
        isBetting: PropTypes.bool.isRequired,
        isChecked: PropTypes.bool.isRequired,
    };
    constructor(props){
        super(props);
        this.state={
            betNum: 0.00,
            odds: 0.00,
            isSomeoneBet: false,
            betAmount: 0,
            maxBet: 0,
            betHorseId: 0,
            betPrice: 0,
            expectedReturn: 0,
            isOwner: false,
            isOpenModal: false,
            secretNumber: 0
        }
    }
    componentDidMount(){
        const self = this;
        const raceId = this.props.race[0].toNumber();
        if(!this.props.horseInfo.get(String(this.props.horseId))){
            getHorseData(this.props.horseId).then(function(result){
                self.props.getHorseInfo(result)
            })
        }
        if(this.props.isBetting){
            const raceId = this.props.race[0].toNumber();
            try {
                getBetInfo(raceId).then((result) => {
                    if(self.props.horseNum === 1){
                        const max = window.web3.fromWei(result[0], 'ether').toFixed(3);
                        const betAmount1 = window.web3.fromWei(result[1], 'ether').toFixed(3);
                        const betAmount2 = window.web3.fromWei(result[4], 'ether').toFixed(3);
                        self.setState({
                            maxBet: max,
                            betAmount: betAmount1,
                        })
                    } else {
                        const max = window.web3.fromWei(result[3], 'ether').toFixed(3);
                        const betAmount1 = window.web3.fromWei(result[1], 'ether').toFixed(3);
                        const betAmount2 = window.web3.fromWei(result[4], 'ether').toFixed(3);
                        self.setState({
                            maxBet: max,
                            betAmount: betAmount2,
                        })
                    }
                });
            }catch(e){
                self.setState({
                    isSomeoneBet: false
                })
            }
            getOdds(raceId).then((result) => {
                self.setState({
                    odds: result[self.props.horseNum-1].toNumber() / 100,
                })
            });
        }
        if(this.props.isBetting || this.props.race[12]){
            console.log(raceId,'RaceID')
            getParticipantPantInfo(raceId).then(result =>{
                console.log('getParticipantinfo',result);
                self.setState({
                    betHorseId: result[0].toNumber(),
                    betPrice: window.web3.fromWei(result[1], 'ether').toFixed(3),
                    expectedReturn: window.web3.fromWei(result[2],'ether').toFixed(3)
                })
            })
        }
        if(this.props.race[12]){
            getTokenOwner(this.props.horseId).then(result => {
                self.setState({
                    isOwner: result === window.web3.eth.coinbase
                })
            })
        }
    }

    returnStatus(gene){
        const status = gene.slice(gene.length-15,gene.length);
        return horseStatus(status)
    }

    openModal(){
        this.setState({
            isOpenModal: true
        })
    }

    closeModal(){
        this.setState({
            isOpenModal: false
        })
    }

    renderHorse(){
        const {odds} = this.state;
        const isChecked = this.props.race[12];
        const winnerId = this.props.race[8].toNumber();
        const raceId = this.props.race[0].toNumber();
        const minWinnerPrize = window.web3.fromWei(this.props.race[6],'ether').toFixed(3);
        const betPrize = window.web3.fromWei(this.props.race[10],'ether').toFixed(3) * this.props.race[7].toNumber() / 100;
        if(this.props.horseInfo.get(String(this.props.horseId))){
            const horse = this.props.horseInfo.get(String(this.props.horseId));
            const gene = horse[1].c.join(',').replace(/,/g,'');
            return(
                <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
                    {isChecked && winnerId === horse[0].toNumber() ? <img src={winImage} style={raceInfoHorseStyle.winImage}/> : null}
                    <p style={raceInfoHorseStyle.horseName}>{horse[2]}</p>
                    <HorseImage type={'race-horse'} horseGene={gene}/>
                    {this.state.isOwner && (isChecked && winnerId === horse[0].toNumber()) ? <Button style={{
                        position: 'absolute',
                        bottom: '56px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }} color='secondary' onClick={()=>withdrawPrize(raceId)}>Withdraw Prize {Number(minWinnerPrize) + Number(betPrize)} ETH</Button> : null}
                    <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: {this.returnStatus(gene).powerTotal}</p>
                    <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: {odds !== 0 ? odds : '？？？'}</p>
                </div>
            )
        } else if(this.props.horseId === 0){
            return(
                <div style={raceInfoHorseStyle.horseImageContainer} className='race-info-horse-back'>
                    <p style={raceInfoHorseStyle.horseName}>???</p>
                    <HorseImage type={'race-horse'} horseGene={'00000000'}/>
                    <p style={raceInfoHorseStyle.powerTotal} className='race-horse-info-back'>power total: ???</p>
                    <p style={raceInfoHorseStyle.odds} className='race-horse-info-back'>odds: ？？？</p>
                </div>
            )
        } else {
            return (
                <img
                    src={loadingGif}
                    width="250px"
                    height="250px"
                />)
        }
    }
    onChangeBetNum(e){
        this.setState({
            betNum: e.target.value * 100
        })
    }
    onChangeSecretNum(e){
        this.setState({
            secretNumber: e.target.value
        })
    }
    upBetNum(){
        const betNum = this.state.betNum;
        this.setState({
            betNum: betNum + 1
        })
    }
    downBetNum(){
        if(this.state.betNum > 0.01){
            const betNum = this.state.betNum;
            this.setState({
                betNum: betNum - 1
            })
        }
    }
    renderBettingInfo(){
        const isChecked = this.props.race[12];
        const raceId = this.props.race[0].toNumber();
        const winnerId = this.props.race[8].toNumber();
        if(this.state.betHorseId === this.props.horseId && !isChecked){
            return(
                <div style={raceInfoHorseStyle.participantInfo}>
                    <p>bet: {this.state.betPrice} ETH</p>
                    <p>expectedReturn: {this.state.expectedReturn} ETH</p>
                </div>
            )
        }else if((isChecked && this.state.betHorseId === winnerId) && (this.state.betHorseId === this.props.horseId)){
            return(
                <div style={raceInfoHorseStyle.participantInfo}>
                    <p>bet: {this.state.betPrice} ETH</p>
                    <p style={raceInfoHorseStyle.winInfo}>You won: {this.state.expectedReturn} ETH <Button onClick={()=>withdrawPayback(raceId)} color='secondary'>Withdraw</Button></p>
                </div>
            )
        }else if((isChecked && this.state.betHorseId === winnerId) && (this.state.betHorseId === this.props.horseId)){
            return(
                <div style={raceInfoHorseStyle.participantInfo}>
                    <p>bet: {this.state.betPrice} ETH</p>
                    <p style={raceInfoHorseStyle.loseInfo}>You Lose</p>
                </div>
            )
        }
    }

    render(){
        const horseId = this.props.horseId;
        const raceId = this.props.race[0].toNumber();
        const horse = this.props.horseInfo.get(String(horseId));
        return(
            <div style={raceInfoHorseStyle.container}>
                <Modal
                    isOpen={this.state.isOpenModal}
                    style={raceInfoHorseStyle.modal}
                    onRequestClose={()=>this.closeModal()}
                >
                    <div style={raceInfoHorseStyle.modalTitle}>
                        You have to choose your secret number you like as a password. Please note race Id <b style={{color: 'red'}}>{raceId}</b> and a number you chose.
                    </div>
                    <div style={raceInfoHorseStyle.modalTextField}>
                        Bet {this.state.betNum / 100} ETH to {horse ? horse[2] : ''}
                    </div>
                    <div style={raceInfoHorseStyle.modalTextField}>
                        Secret Number
                        <TextField
                            value={this.state.secretNumber}
                            type='number'
                            inputProps={{step: 1, min: 0}}
                            onChange={e=>this.onChangeSecretNum(e)}
                            style={{marginLeft: '14px'}}
                        />
                    </div>
                    <div style={raceInfoHorseStyle.modalTextField}>
                        <Button
                            onClick={()=>betRace(raceId,horseId,this.state.betNum / 100,this.state.secretNumber)}
                            color='secondary'
                            style={{backgroundColor: 'black'}}
                        >Bet Race</Button>
                    </div>
                </Modal>
                <div style={raceInfoHorseStyle.horseNum}>horse No.{this.props.horseNum}</div>
                {this.renderHorse()}
                <div style={raceInfoHorseStyle.bettingInfo}>
                    <div style={raceInfoHorseStyle.bettingGage}><span style={{
                        background: 'linear-gradient(90deg, blue, yellow)',
                        width: `${Math.ceil((Number(this.state.betAmount) / (Number(this.state.maxBet) + Number(this.state.betAmount))) * 100) + '%'}`,
                        height: '100%',
                        position: 'absolute',
                        zIndex: 2
                    }}></span></div>
                    <div style={raceInfoHorseStyle.currentTotalBet}>now {this.state.betAmount} ETH Bet
                        <span style={raceInfoHorseStyle.currentMaxBet}> {this.state.maxBet} ETH Remaining</span>
                    </div>
                </div>
                {this.renderBettingInfo()}
                <div style={raceInfoHorseStyle.betAction(this.state.betHorseId === 0)}>
                    <button
                        style={raceInfoHorseStyle.changeBetNumButton}
                        onClick={()=>this.downBetNum()}
                    >◀︎
                    </button>
                    <input
                        type="number"
                        step="0.01"
                        value={this.state.betNum / 100}
                        style={raceInfoHorseStyle.inputBetNum}
                        onChange={e => this.onChangeBetNum(e)}
                        min="0.01"
                    />
                    <button
                        style={raceInfoHorseStyle.changeBetNumButton}
                        onClick={()=>this.upBetNum()}
                    >▶︎</button>&nbsp;
                    ETH
                    <button style={raceInfoHorseStyle.betButton}
                            className='bet-button'
                            disabled={this.state.betHorseId !== 0}
                            onClick={()=>this.openModal()}>
                        bet
                    </button>
                </div>
            </div>
        )
    }
}

export default RaceInfoHorse
