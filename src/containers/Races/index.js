import React, {Component} from 'react'
import { racePageStyles } from './styles'
import injectSaga from '../../utils/injectSaga'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RaceCard from '../../components/RaceCard'
import Pagination from '../../components/Pagination'
import saga from './saga'
import {
    startLoadRaceArray,
    changeRacePage,
    getRaceInfo
} from "./actions";
import {
    selectRaceInfo,
    selectAllRaceArray,
    selectAllRaceArrayLoaded,
    selectWantedRaceArray,
    selectBettingRaceArray,
    selectCheckedRaceArray,
    selectHorseInfo,
    selectRaceCurrentDisp,
    selectMyRaeArray,
    selectMyHorseIdArray,
    selectRaceLoaded
} from "./selectors";
import ApplyRaceModal from '../../components/ModalApplyRace'
import HostRaceModal from '../../components/ModalHostRace'
import Modal from 'react-modal'
const loadingGif = 'https://image.eth-horse.com/static_assets/loading_default.gif';

Modal.setAppElement('#root');

class Races extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalPage: 1,
            currentPage: 1,
            buttonPerPage: 10,
            isHostRaceModalOpen: false,
            bettingDuration:0,
            prizeRate: 0,
            minWinnerPrize: 0,
            deposit: 0,
            isApplyRaceModalOpen: false,
            currentSelectedRaceId: 0,
            currentDisplay: ''
        };
        this.onChangePage = this.onChangePage.bind(this);
        this.openApplyRaceModal = this.openApplyRaceModal.bind(this);
        this.openHostRaceModal = this.openHostRaceModal.bind(this);
        this.closeHostRaceModal = this.closeHostRaceModal.bind(this)
    }
    componentDidMount(){
        let totalPage;
        switch (this.props.currentDisplay){
            case 'now-wanted':
                totalPage = Math.ceil(this.props.wantedRaceArray.filter(race=>race).length / 4);
                break;
            case 'now-betting':
                totalPage = Math.ceil(this.props.bettingRaceArray.filter(race => race).length / 4);
                break;
            case 'my-races':
                totalPage = Math.ceil(this.props.myRaceArray.filter(race => race).length / 4);
                break;
            case 'ended':
                totalPage = Math.ceil(this.props.checkedRaceArray.filter(race => race).length / 4 );
                break;
            default:
                totalPage = 1;
                break;
        }
        this.setState({
            totalPage: totalPage
        });
    }

    componentWillReceiveProps(props,state){
        let totalPage;
        switch (props.currentDisplay){
            case 'now-wanted':
                totalPage = Math.ceil(this.props.wantedRaceArray.filter(race=>race).length / 4);
                break;
            case 'now-betting':
                totalPage = Math.ceil(this.props.bettingRaceArray.filter(race => race).length / 4);
                break;
            case 'my-races':
                totalPage = Math.ceil(this.props.myRaceArray.filter(race => race).length / 4);
                break;
            case 'ended':
                totalPage = Math.ceil(this.props.checkedRaceArray.filter(race => race).length / 4 );
                break;
        }
        this.setState({
            totalPage: totalPage
        });

        if(props.currentDisplay !== this.props.currentDisplay){
            this.setState({
                currentPage: 1
            })
        }
    }

    onChangePage(currentPage){
        this.setState({
            currentPage: currentPage
        },function(){
            this.props.movePage(currentPage)
        })
    }

    currentState(index){
        const wantedArray = this.props.wantedRaceArray;
        const bettingArray = this.props.bettingRaceArray;
        const checkedArray = this.props.checkedRaceArray;
        if(wantedArray[index]){
            return 'now wanted'
        }else if(bettingArray[index]){
            return 'now betting'
        }else if(checkedArray[index]){
            return 'ended'
        }else{
            return 'calculate odds'
        }
    }
    renderRaces(){
        const self = this;
        switch(this.props.currentDisplay){
            case 'now-wanted':
                const wantedArray = this.props.wantedRaceArray ? this.props.wantedRaceArray.map((elem,index) => {
                    return {
                        id: index + 1,
                        wanted: elem
                    }
                }).filter(race => race.wanted).slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
                return wantedArray.map((elem,index) => {
                    return (
                        <RaceCard
                            currentState='now wanted'
                            isMyRace={false}
                            raceId={elem.id}
                            openApplyRaceModal={this.openApplyRaceModal}
                            key={'race'+index}
                        />
                    )
                });
            case 'now-betting':
                const bettingArray = this.props.bettingRaceArray ? this.props.bettingRaceArray.map((elem,index) => {
                    return {
                        id: index + 1,
                        betting: elem
                    }
                }).filter(race => race.betting).slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
                return bettingArray.map((elem,index) => {
                    return (
                        <RaceCard
                            currentState='now betting'
                            isBetting={true}
                            raceId={elem.id}
                            key={'race'+index}
                        />
                    )
                });
            case 'ended':
                const checkedArray = this.props.checkedRaceArray ? this.props.checkedRaceArray.map((elem,index) => {
                    return {
                        id: index + 1,
                        isChecked: elem
                    }
                }).filter(race => race.isChecked).slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
                return checkedArray.map((elem,index) => {
                    return (
                        <RaceCard
                            currentState='ended'
                            raceId={elem.id}
                            key={'race' + index}
                        />
                    );
                });
            case 'my-races':
                const myRaceArray = this.props.myRaceArray ? this.props.myRaceArray.slice(4*(this.state.currentPage-1),4*this.state.currentPage) : [];
                return myRaceArray.map((elem,index) => {
                    return (
                        <RaceCard
                            raceId={elem.toNumber()}
                            currentState={self.currentState(elem.toNumber() - 1)}
                            openApplyRaceModal={this.openApplyRaceModal}
                            isMyRace={true}
                            key={'race' + index}
                        />
                    )
                })
            default:
                return null
        }
    }
    openHostRaceModal(){
        this.setState({
            isHostRaceModalOpen: true
        })
    }
    closeHostRaceModal(){
        this.setState({
            isHostRaceModalOpen: false
        })
    }
    openApplyRaceModal(num){
        this.setState({
            isApplyRaceModalOpen: true,
            currentSelectedRaceId: num
        })
    }
    closeApplyRaceModal(){
        this.setState({
            isApplyRaceModalOpen: false
        })
    }

    render () {
        if(this.props.loaded){
            return(
                <div style={racePageStyles.outerContainer}>
                    <div style={racePageStyles.innerContainer}>
                        <HostRaceModal closeModal={this.closeHostRaceModal} isActive={this.state.isHostRaceModalOpen}/>
                        <ApplyRaceModal
                            isActive={this.state.isApplyRaceModalOpen} ownedHorses={this.props.ownedHorses.toArray()}
                            horseInfo={this.props.horseIdToInfo} closeModal={()=>this.closeApplyRaceModal()} raceId={this.state.currentSelectedRaceId}
                        />
                        <div style={racePageStyles.headerBottom}>
                            <button style={racePageStyles.holdRaceButton} onClick={()=>this.openHostRaceModal()}>Hold Race +</button>
                        </div>
                        {this.renderRaces()}
                        <Pagination
                            totalPage={this.state.totalPage}
                            currentPage={this.state.currentPage}
                            buttonPerPage={this.state.buttonPerPage}
                            onChangePage={this.onChangePage}
                        />
                    </div>
                </div>
            )
        }else{
            return (
                <div style={racePageStyles.gifContainer}>
                    <LoadGif/>
                </div>
            )
        }
    }
}

function LoadGif(){
    return (
        <div style={{
            width: '515px',
            height: '580px',
            display: 'relative'
        }}>
            <img
                src={loadingGif}
                style={{
                    width: '80px',
                    height: '80px',
                    position: 'absolute',
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            />
        </div>
    )
}

const mapStateToProps = (state) => createStructuredSelector({
    raceNum: selectAllRaceArray(),
    raceArrayLoaded: selectAllRaceArrayLoaded(),
    raceIdToRaceInfo: selectRaceInfo(),
    wantedRaceArray: selectWantedRaceArray(),
    bettingRaceArray: selectBettingRaceArray(),
    checkedRaceArray: selectCheckedRaceArray(),
    horseIdToInfo: selectHorseInfo(),
    currentDisplay: selectRaceCurrentDisp(),
    myRaceArray: selectMyRaeArray(),
    ownedHorses: selectMyHorseIdArray(),
    loaded: selectRaceLoaded()
});
const mapDispatchToProps = (dispatch) => ({
    startLoadRaces: () => dispatch(startLoadRaceArray()),
    movePage: page => dispatch(changeRacePage(page)),
    getRaceInfo: race => dispatch(getRaceInfo(race))
});
const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'races-saga',saga});

export default compose(
    withSaga,
    withConnect
)(Races);
