import React, { Component } from 'react'
import HorseImage from '../../components/HorseImage'
import PropTypes from 'prop-types'
import { raceCardStyles } from "./styles";
import {
    getHorseData,
    getRaceBetEndTime,
    checkResult,
    getRaceCommitEndTime,
} from "../../utils/eth-function";
import {
    calculateDate
} from "../../utils/functions";
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import BookMakeModal from '../Modal-bookmake'
import Modal from 'react-modal'
import CommitRaceModal from '../Modal-commitRace'
import ModalCheckResult from '../Modal-checkResult'
const styles = theme => ({
    commitRaceButton: {
        fontSize: '12px',
        color: 'white',
        backgroundColor: 'black'
    },
    fontFamily: {
        fontFamily: 'yrsa-bold'
    }
});

class RaceCard extends Component{
    static propTypes = {
        race: PropTypes.array,
        raceId: PropTypes.number.isRequired,
        getHorse: PropTypes.func,
        horseInfo: PropTypes.object,
        currentState: PropTypes.string,
        isMyRace: PropTypes.bool,
        openApplyRaceModal: PropTypes.func,
        isBetting: PropTypes.bool,
    };
    constructor(props){
        super(props);
        this.state={
            isBookMakeModalOpen: false,
            isShowRaceModalOpen: false,
            betEndTime: '',
            commitEndTime: '',
            betEndLoaded: false,
            betEndRowDate: '',
            commitEndLoaded: false,
            commitEndRowDate: '',
            isOpenCommitModal: false,
            secretNum: 0
        };
        this.closeBookMakeModal = this.closeBookMakeModal.bind(this)
    }
    async componentDidMount(){
        const self = this;
        const raceId = this.props.raceId;
        if(this.props.race[2].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[2].toNumber()))){
            const horseOne = await getHorseData(this.props.race[2].toNumber());
            await this.props.getHorse(horseOne);
        }
        if(this.props.race[3].toNumber() !== 0 && !this.props.horseInfo.get(String(this.props.race[3].toNumber()))) {
            const horseTwo = await getHorseData(this.props.race[3].toNumber());
            await this.props.getHorse(horseTwo);
        }
        getRaceBetEndTime(raceId).then((result) => {
            const date = calculateDate(result);
            self.setState({
                betEndTime: date[0],
                betEndRowDate: date[1],
                betEndLoaded: true
            });
        });
        getRaceCommitEndTime(raceId).then((result) => {
            const date = calculateDate(result);
            self.setState({
                commitEndTime: date[0],
                commitEndRowDate: date[1],
                commitEndLoaded: true
            })
        })
    }
    componentWillReceiveProps(props){
        const self = this;
        if(!this.state.betEndRowDate || !this.state.commitEndRowDate){
            getRaceBetEndTime(props.raceId).then((result) => {
                const date = calculateDate(result);
                self.setState({
                    betEndTime: date[0],
                    betEndRowDate: date[1],
                    betEndLoaded: true
                });
            });
            getRaceCommitEndTime(props.raceId).then((result) => {
                const date = calculateDate(result);
                self.setState({
                    commitEndTime: date[0],
                    commitEndRowDate: date[1],
                    commitEndLoaded: true
                })
            })
        }
    }
    openBookMakeModal(){
        this.setState({
            isBookMakeModalOpen: true
        })
    }
    closeBookMakeModal(){
        this.setState({
            isBookMakeModalOpen: false
        })
    }

    renderCurrentStateButton(state,isLoaded){
        const raceId = this.props.race[0].toNumber();
        if(isLoaded){
            switch(state){
                case 'now wanted':
                    return <button style={raceCardStyles.currentState} className='race-current-state-wanted' onClick={()=>this.props.openApplyRaceModal(raceId)}/>;
                case 'now betting':
                    return <button style={raceCardStyles.currentState} className='race-current-state-betting'/>;
                case 'commit race':
                    return <button style={raceCardStyles.currentState} className='race-current-state' onClick={()=>this.openCommitModal()}>confirm</button>;
                case 'ended':
                    return <button style={raceCardStyles.currentState} className='race-current-state-ended'/>;
                case 'calculate odds':
                    return <button style={raceCardStyles.decideBet} className='race-current-state' onClick={()=>this.openBookMakeModal()}>decide odds</button>;
                case 'check result':
                    return <button style={raceCardStyles.currentState} className='race-current-state-check-result' onClick={() => checkResult(raceId)}/>;
                default:
                    return <button style={raceCardStyles.currentState} className={'race-current-state'}>Now Loading...</button>;
            }
        }else{
            return <button style={raceCardStyles.currentState} className={'race-current-state'}>Now Loading...</button>
        }
    }
    openShowRaceModal(){
        this.setState({
            isShowRaceModalOpen: true
        })
    }
    closeShowRaceModal(){
        this.setState({
            isShowRaceModalOpen: false
        })
    }
    renderLink(state){
        switch (state){
            case 'ended':
                return <button style={{textDecoration: 'underline', backgroundColor:'transparent', outline: 'none', border: 'none'}} onClick={()=>this.openShowRaceModal()}><p style={raceCardStyles.raceNameP}>{this.props.race[5]}</p></button>
            default:
                return <Link to={'/races/' + this.props.race[0].toNumber()}><p style={raceCardStyles.raceNameP}>{this.props.race[5]}</p></Link>;

        }
    }
    renderCurrentState(betEnd,commitEnd){
        const now = new Date(Date.now());
        if(commitEnd <= new Date(0) || betEnd <= new Date(0)){
            return null
        }else if(now >= commitEnd){
            return 'check result'
        }else if(now < commitEnd && now >= betEnd){
            return 'commit race'
        }else if(now < betEnd){
            return 'now betting'
        }
    }
    renderTimeInfo(betEnd){
        const now = new Date(Date.now());
        return betEnd > now ? `bet until ${this.state.betEndTime}` : `commit until ${this.state.commitEndTime}`;
    }
    openCommitModal(){
        this.setState({
            isOpenCommitModal: true
        })
    }
    closeCommitModal(){
        this.setState({
            isOpenCommitModal: false
        })
    }

    render(){
        const { classes } = this.props;
        const betEndTime = this.state.betEndRowDate;
        const commitEndTime = this.state.commitEndRowDate;
        const currentState = this.props.currentState === 'now betting' ? this.renderCurrentState(betEndTime,commitEndTime) : this.props.currentState;
        const raceId = this.props.raceId;
        const horse1 = this.props.horseInfo.get(String(this.props.race[2].toNumber()));
        const horse2 = this.props.horseInfo.get(String(this.props.race[3].toNumber()));
        const horseGene1 = horse1 ? horse1[1].c.join(',').replace(/,/g,'') : '0000000';
        const horseGene2 = horse2 ? horse2[1].c.join(',').replace(/,/g,'') : '000000';
        const winnerHorseIndex = this.props.race[2].toNumber() === this.props.race[8].toNumber() ? '0' : '1';
        const winnerHorseName = this.props.horseInfo.get(String(this.props.race[8].toNumber())) ? this.props.horseInfo.get(String(this.props.race[8].toNumber()))[2] : '';
        const isLoaded = this.state.betEndLoaded && this.state.commitEndLoaded;
        if(this.props.isMyRace){
            return(
                <div style={raceCardStyles.cardContainer}>
                    <CommitRaceModal isModalOpen={this.state.isOpenCommitModal} closeModal={this.closeCommitModal.bind(this)} raceId={raceId}/>
                    <BookMakeModal
                        isModalOpen={this.state.isBookMakeModalOpen}
                        closeModal={this.closeBookMakeModal}
                        race={this.props.race}
                        horseInfo={this.props.horseInfo}
                    />
                    <ModalCheckResult gene1={horseGene1} gene2={horseGene2} raceId={this.props.race[0].toNumber()} isOpen={this.state.isShowRaceModalOpen} closeModal={this.closeShowRaceModal.bind(this)} winnerHorseIndex={winnerHorseIndex} winnerHorseName={winnerHorseName}/>
                    <div style={raceCardStyles.cartContainerTop}>
                        <p>{currentState === 'now wanted' ? 'now you can apply race' : this.renderTimeInfo(betEndTime)}</p>
                    </div>
                    <div style={raceCardStyles.raceInfoContainer}>
                        {this.renderLink(currentState)}
                        <p style={raceCardStyles.winnerPrizeP}>Winner Prize:&nbsp; <b>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)}</b> ETH + <b>{this.props.race[7].toNumber()}</b> % of total bet</p>
                        {this.renderCurrentStateButton(currentState,isLoaded)}
                    </div>
                    <div style={raceCardStyles.horseImgContainer}>
                        <div style={raceCardStyles.horseContainer}>
                            <div className='horse-back' style={raceCardStyles.horseBack}>
                                <HorseImage type={'normal'} horseGene={horseGene1}/>
                            </div>
                            <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[2] : '???'}</p>
                        </div>
                        <div style={raceCardStyles.horseContainer}>
                            <div className='horse-back' style={raceCardStyles.horseBack}>
                                <HorseImage type={'normal'} horseGene={horseGene2}/>
                            </div>
                            <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[2] : '???'}</p>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={raceCardStyles.cardContainer}>
                    <CommitRaceModal isModalOpen={this.state.isOpenCommitModal} closeModal={this.closeCommitModal.bind(this)} raceId={raceId}/>
                    <ModalCheckResult gene1={horseGene1} gene2={horseGene2} raceId={this.props.race[0].toNumber()} isOpen={this.state.isShowRaceModalOpen} closeModal={this.closeShowRaceModal.bind(this)} winnerHorseIndex={winnerHorseIndex} winnerHorseName={winnerHorseName}/>
                    <div style={raceCardStyles.cartContainerTop}>
                        <p>{currentState === 'now wanted' ? 'now you can apply race' : this.renderTimeInfo(betEndTime)}</p>
                    </div>
                    <div style={raceCardStyles.raceInfoContainer}>
                        {this.renderLink(currentState)}
                        <p style={raceCardStyles.winnerPrizeP}>Winner Prize:&nbsp;<b>{window.web3.fromWei(this.props.race[6],'ether').toNumber().toFixed(2)}</b> ETH + <b>{this.props.race[7].toNumber()}</b> % of total bet</p>
                        {this.renderCurrentStateButton(currentState,isLoaded)}
                    </div>
                    <div style={raceCardStyles.horseImgContainer}>
                        <div style={raceCardStyles.horseContainer}>
                            <div className='horse-back' style={raceCardStyles.horseBack}>
                                <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[1].c.join(',').replace(/,/g,'') : '0000000'}/>
                            </div>
                            <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[2].toNumber())) ? this.props.horseInfo.get(String(this.props.race[2].toNumber()))[2] : '???'}</p>
                        </div>
                        <div style={raceCardStyles.horseContainer}>
                            <div className='horse-back' style={raceCardStyles.horseBack}>
                                <HorseImage type={'normal'} horseGene={this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[1].c.join(',').replace(/,/g,'') : '000000'}/>
                            </div>
                            <p style={raceCardStyles.horseNameP}>{this.props.horseInfo.get(String(this.props.race[3].toNumber())) ? this.props.horseInfo.get(String(this.props.race[3].toNumber()))[2] : '???'}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default withStyles(styles)(RaceCard)

