import React, { Component } from 'react'
import {sellHorseModalStyle} from "./sellHorseModalStyle";
import {connect} from 'react-redux'
import { compose } from 'redux'
import HorseImage from '../../components/HorseImage/'
import HorseStatusGragh from '../../components/HorseStatusGragh'
import HorseStatusParamImages from '../../components/HorseStatusParamImages'
import SireRaceNum from '../../components/HorseStatusSireRaceNum'
import HorseTextureParamSire from '../../components/HorseTextureParamSire'
import {
    selectHorseIdToHorseInfo,
    selectHorseIdArray,
    selectCurrentSireHorseId,
    selectCurrentSirePage,
    selectMatePrice
} from "./selectors";
import {
    startLoadMyHorseArray,
    getHorseInfoSuccess,
    setSireHorseId,
    changeSireHorsePage
} from './actions'
import {
    getHorseData,
    sireHorses,
    sireWithOnSaleHorse,
    getTokenOwner
} from "../../utils/eth-function";
import {
    returnRarity
} from "../../utils/mapHorseInfoToRarity";
import HorseStatusCard from '../../components/HorseStatusCard/'
import { createStructuredSelector } from 'reselect';
import loadingGif from '../../assets/static_assets/umaLoading.gif'
import saga from './saga'
import injectSaga from "../../utils/injectSaga";
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MessageCard from '../../components/MessageCard'

const styles = theme => ({
    button: {
        fontFamily: 'yrsa-regular',
        fontSize: '14px',
        backgroundColor: 'black',
        color: 'white',
        height: '35px'
    },
    inputField: {
        fontFamily: 'yrsa-regular',
        fontSize: '14px',
        height: '42px'
    }
});

class SireHorsePage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage: 1,
            totalPage: 1,
            sireHorseInfoLoaded: false,
            isNameModalOpen: false,
            horseName: '',
            papaId: 0,
            mamaId: 0,
            isMyHorse: false,
            alertMessage: '',
            isMessageCardShow: false
        }
    }
    async componentDidMount(){
        if(Number(this.props.match.params.id) !== this.props.currentSireHorseId){
            this.props.setCurrentSireHorseId(Number(this.props.match.params.id))
        }
        this.props.horseArrayLoadStart();
        const sireHorse = this.props.horseIdToInfo.get(this.props.match.params.id);
        if(sireHorse){
            this.setState({
                sireHorseInfoLoaded: true
            })
        } else {
            const horse = await getHorseData(this.props.match.params.id);
            this.props.getHorseDataSuccess(horse);
            this.setState({
                sireHorseInfoLoaded: true
            })
        }

    }
    componentWillReceiveProps(props) {
        this.setState({
            totalPage: Math.ceil((this.props.horseIdArray.toArray().length - 1) / 3)
        });
        this.setState({
            currentPage: props.currentPage
        })
    }
    renderStars(rarityLevel,level){
        let stars = [];
        switch (rarityLevel) {
            case 1:
                for(var i=0;i<1;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <span style={{
                    height: '30px',
                    width: '35%',
                    lineHeight: '30px',
                    position: 'relative',
                    fontSize: '14px',
                    color: level === 2 ? 'rgb(104,134,184)' : 'rgb(156,229,225)'
                }}>{stars} lev.{level}</span>;
            case 2:
                for(var i=0;i<2;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <span style={{
                    height: '30px',
                    width: '35%',
                    lineHeight: '30px',
                    position: 'relative',
                    fontSize: '14px',
                    color: level === 4 ? 'rgb(241,167,186)' : 'rgb(139,134,202)'
                }}>{stars} lev.{level}</span>;
            case 3:
                for(var i=0;i<3;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <span style={{
                    height: '30px',
                    width: '35%',
                    position: 'relative',
                    lineHeight: '30px',
                    fontSize: '14px',
                    color: level === 6 ? 'rgb(239,139,106)' : 'rgb(233,94,190)'
                }}>{stars} lev.{level}</span>;
            case 4:
                for(var i=0;i<4;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <span style={{
                    height: '30px',
                    width: '35%',
                    position: 'relative',
                    lineHeight: '30px',
                    fontSize: '14px',
                    color: level === 8 ? 'rgb(249,198,51)' : 'rgb(237,109,51)'
                }}>{stars} lev.{level}</span>;
            case 5:
                for(var i=0;i<5;i++){
                    stars.push(<span key={i+'star'}>★</span>)
                }
                return <span style={{
                    height: '30px',
                    width: '35%',
                    position: 'relative',
                    lineHeight: '30px',
                    fontSize: '14px',
                    color: level === 10 ? 'rgb(0,28,113)' : 'rgb(234,63,51)'
                }}>{stars} lev.{level}</span>;
            default:
                return null
        }
    }
    renderHorses(){
        const self = this;
        const { currentSireHorseId } = this.props;
        const array = this.props.horseIdArray ? this.props.horseIdArray.filter(elem => elem.toNumber() !== Number(this.props.match.params.id)).slice(3*(this.state.currentPage-1),3*this.state.currentPage) : [];
        return array.map((elem,index) => {
            const horseId = elem.toNumber();
            const horse = self.props.horseIdToInfo.get(String(horseId)) ? self.props.horseIdToInfo.get(String(horseId)) : null;
            if(horse) {
                if(horse[0].toNumber() !== Number(self.props.match.params.id)){
                    return (
                        <div
                            style={sellHorseModalStyle.sireHorseWrapper}
                            key={'myhorse-' + index}
                        >
                            <HorseStatusCard
                                info={horse}
                                isMyHorse={true}
                                isLeft={true}
                            />
                            <button style={sellHorseModalStyle.sireHorseButton} className='sire-horse-button'
                                    onClick={()=>this.openDecideNameModal(currentSireHorseId,horseId)}>
                                Sire Horse
                            </button>
                        </div>
                    )
                }
            } else {
                return(
                    <img
                        key={'loading-'+index}
                        src={loadingGif}
                        style={{
                            width: '200px',
                            height: '200px',
                            top: '65px'
                        }}
                    />
                )
            }
        })
    }
    powerTotal(gene){
        return Math.ceil(Number(gene.slice(0,3)) / 100)+
            Math.ceil(Number(gene.slice(3,6)) / 100)+
            Math.ceil(Number(gene.slice(6,9)) / 100)+
            Math.ceil(Number(gene.slice(9,12)) / 100)+
            Math.ceil(Number(gene.slice(12,15)) / 100)
    }
    progressPage(){
        this.props.changePage(this.state.currentPage+1)
    }
    backPage(){
        this.props.changePage(this.state.currentPage-1)
    }
    openDecideNameModal(papaId,mamaId){
        const self = this;
        getTokenOwner(papaId).then(function(result){
            if(window.web3.eth.coinbase === result){
                self.setState({
                    isNameModalOpen: true,
                    papaId: papaId,
                    mamaId: mamaId,
                    isMyHorse: true
                })
            }else{
                this.setState({
                    isNameModalOpen: true,
                    papaId: papaId,
                    mamaId: mamaId,
                    isMyHorse: false
                })
            }
        });
    }
    changeName(e){
        this.setState({
            horseName: e.target.value
        })
    }
    closeNameModalOpen(){
        this.setState({
            isNameModalOpen: false,
            papaId: 0,
            mamaId: 0,
            horseName: '',
            isMyHorse: false
        })
    }
    showAlertMessage(message){
        this.setState({
            isMessageCardShow: true,
            alertMessage: message
        });
        window.setTimeout(()=>{
            this.setState({
                isMessageCardShow: false
            })
        },4500)
    }
    sireHorse(){
        //name is empty
        if(this.state.papaId === 0 || this.state.mamaId === 0){this.showAlertMessage('Sorry, something works incorrect, please retry.'); return;}
        if(this.state.horseName.length === 0){this.showAlertMessage('HorseName should not be empty.'); return;}
        if(this.state.isMyHorse){
            sireHorses(this.state.papaId,this.state.mamaId,this.state.horseName,this.props.matePrice)
        }else{
            const horse = this.props.horseIdToInfo.get(this.props.match.params.id);
            sireWithOnSaleHorse(this.state.papaId,this.state.mamaId,this.state.horseName,horse[9])
        }
    }
    render () {
        const { classes } = this.props;
        if(this.state.sireHorseInfoLoaded){
            const id = this.props.match.params.id;
            const horse = this.props.horseIdToInfo.get(id);
            const gene = horse[1].c.join(',').replace(/,/g,'');
            const powerGene = gene.slice(gene.length-15,gene.length);
            const texGene = gene.slice(gene.length-38,gene.length-20);
            const mateRaceIndex = Math.ceil((horse[6].toNumber() + horse[7].toNumber()) / 10);
            const rarity = returnRarity(gene) + mateRaceIndex;
            return (
                <div style={sellHorseModalStyle.modalContainer}>
                    <MessageCard message={this.state.alertMessage} isShown={this.state.isMessageCardShow}/>
                    <Modal
                        isOpen={this.state.isNameModalOpen}
                        style={sellHorseModalStyle.sireNameModalContent}
                        onRequestClose={()=>this.closeNameModalOpen()}
                        contentLabel={'Name'}
                    >
                        <span>
                  <div style={sellHorseModalStyle.modalHorseName}>
                     Horse Name
                  </div>
                  <div style={sellHorseModalStyle.sireModalInputWrapper}>
                    <TextField
                        type='string'
                        label='Name'
                        onChange={e=>this.changeName(e)}
                        value={this.state.horseName}
                        className={classes.inputField}
                    />
                  </div>
                  <div style={sellHorseModalStyle.sireModalInputWrapper}>
                        <Button
                            variant="raised"
                            className={classes.button}
                            size={'small'}
                            onClick={()=>this.sireHorse()}
                        >
                        Sire Horses
                        </Button>
                  </div>
              </span>
                    </Modal>
                    <div style={sellHorseModalStyle.modalContent}>
                        <div style={sellHorseModalStyle.sireHorseTop}>
                            <div style={sellHorseModalStyle.sireHorseImgWrapper}>
                                <div style={sellHorseModalStyle.sireHorseImgBack} className='sire-horse-back'>
                                    {horse[13] ? <div
                                        className='horse-price-imgae'
                                        style={sellHorseModalStyle.sirePrice}
                                    >{window.web3.fromWei(horse[9],'ether').toFixed(3)} ETH</div> : ''}
                                    <HorseImage type={'sire'} horseGene={gene}/>
                                </div>
                            </div>
                            <div style={sellHorseModalStyle.sireHorseStatus}>
                                <p style={sellHorseModalStyle.sireHorseName}>
                                    {horse[2]}
                                    <span style={sellHorseModalStyle.isOnSireSale}> {horse[13] ? 'now on sire sale' : ''}</span>
                                </p>
                                <div style={sellHorseModalStyle.sireHorseStatus}>
                                    <div style={sellHorseModalStyle.sireHorseStatusComponent}>
                                        <p style={sellHorseModalStyle.sireHorsePowerTotal}>power total : {this.powerTotal(powerGene)}</p>
                                        <HorseStatusGragh
                                            gene={powerGene}
                                            style={sellHorseModalStyle.horseParamDiagram}
                                        />
                                        <HorseStatusParamImages
                                            gene={powerGene}
                                            style={sellHorseModalStyle.statusParamDiagram}
                                        />
                                        <SireRaceNum
                                            style={sellHorseModalStyle.sireAndRaceNum}
                                            sireIndex={horse[6].toNumber()}
                                            raceIndex={horse[7].toNumber()}
                                        />
                                    </div>
                                    <div style={sellHorseModalStyle.sireHorseStatusComponentRight}>
                                        <div style={sellHorseModalStyle.sireHorseRightContainer}>
                                            <p style={sellHorseModalStyle.rarity}>
                                                Rarity &nbsp; {this.renderStars(Math.ceil(rarity / 2), rarity)}
                                            </p>
                                            <div style={sellHorseModalStyle.textureStatsContainer}>
                                                <HorseTextureParamSire style={sellHorseModalStyle.bottomTexContainer} gene={texGene} num={0}/>
                                                <HorseTextureParamSire style={sellHorseModalStyle.bottomTexContainer} gene={texGene} num={1}/>
                                                <HorseTextureParamSire style={sellHorseModalStyle.bottomTexContainer} gene={texGene} num={2}/>
                                                <HorseTextureParamSire style={sellHorseModalStyle.bottomTexContainer} gene={texGene} num={3}/>
                                                <HorseTextureParamSire style={sellHorseModalStyle.bottomTexContainer} gene={texGene} num={4}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={sellHorseModalStyle.sireHorseList}>
                            {this.state.currentPage > 1 ? <button style={sellHorseModalStyle.pageBackButton} onClick={()=>this.backPage()}>◀</button> : null}
                            <div style={sellHorseModalStyle.sireHorseListInnerContainer}>
                                {this.renderHorses()}
                            </div>
                            {this.state.currentPage < this.state.totalPage ? <button style={sellHorseModalStyle.pageNextButton} onClick={()=>this.progressPage()}>▶︎</button> : null}
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = () => createStructuredSelector({
    horseIdToInfo: selectHorseIdToHorseInfo(),
    horseIdArray: selectHorseIdArray(),
    currentSireHorseId: selectCurrentSireHorseId(),
    currentPage: selectCurrentSirePage(),
    matePrice: selectMatePrice()
});
const mapDispatchToProps = (dispatch) => ({
    horseArrayLoadStart: ()=>dispatch(startLoadMyHorseArray()),
    getHorseDataSuccess: (horse)=>dispatch(getHorseInfoSuccess(horse)),
    setCurrentSireHorseId: (id) => dispatch(setSireHorseId(id)),
    changePage: page => dispatch(changeSireHorsePage(page)),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'my-horse',saga});

export default compose(
    withConnect,
    withSaga
)(withStyles(styles)(SireHorsePage))
