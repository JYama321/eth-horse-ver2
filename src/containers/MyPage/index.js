import React, { Component } from 'react'
import {
    selectMyPageCurrentDisp,
    selectBalance,
    selectActivity,
    selectTrainTicketNum,
    selectShuffleTicketNum,
    selectShuffleAllTicketNum,
    selectHorseArrayLoading,
    selectHorseIdArray,
    selectHorseIdToHorseInfo,
    selectMyPageLoaded
} from "./selectors";
import {
    changeCurrentDisplay,
    startLoadMyHorses,
    getHorseInfoSuccess
} from "./actions";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import MyPageHorses from '../MyPage-horses'
import MyPageActivity from '../MyPage-activities'
import MyPageStatus from '../MyPage-status'
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";
const loadingGif = 'https://image.eth-horse.com/static_assets/loading_default.gif';

class MyPage extends Component {
    componentDidMount(){
        this.props.startGetMyHorses()
    }
    componentWillReceiveProps(props,state){
        if(props.currentDisplay !== this.props.currentDisplay){
            window.scrollTo(0,120);
        }
    }
    render(){
        if(this.props.myPageLoaded){
            switch(this.props.currentDisplay){
                case 'status':
                    return <MyPageStatus
                        balance={String(this.props.balance)}
                        changeDisplay={this.props.changeDisplay}
                        getHorseInfo={this.props.getHorseInfo}
                        activities={this.props.activity.toArray()}
                        trainTicketNum={this.props.trainTicketNum.toNumber()}
                        shuffleTicketNum={this.props.shuffleTicketNum.toNumber()}
                        shuffleAllTicketNum={this.props.shuffleAllTicketNum.toNumber()}
                        ownedHorses={this.props.myHorseIds.toArray()}
                        horseIdToInfo={this.props.horseIdToInfo}
                    />;
                case 'my-horses':
                    return <MyPageHorses/>;
                case 'activity':
                    return <MyPageActivity/>;
                default:
                    return null
            }
        } else {
            return <img
                src={loadingGif}
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    left: '50%',
                    top: '350px',
                    transform: 'translateX(-50%)'
                }}
            />
        }
    }
}

const mapStateToProps = () => createStructuredSelector({
    currentDisplay: selectMyPageCurrentDisp(),
    balance: selectBalance(),
    activity: selectActivity(),
    trainTicketNum: selectTrainTicketNum(),
    shuffleTicketNum: selectShuffleTicketNum(),
    shuffleAllTicketNum: selectShuffleAllTicketNum(),
    myHorseIdsLoaded: selectHorseArrayLoading(),
    myHorseIds: selectHorseIdArray(),
    horseIdToInfo: selectHorseIdToHorseInfo(),
    myPageLoaded: selectMyPageLoaded()
});
const mapDispatchToProps = (dispatch) => ({
    changeDisplay: (page) => dispatch(changeCurrentDisplay(page)),
    startGetMyHorses: (array) => dispatch(startLoadMyHorses(array)),
    getHorseInfo: horse => dispatch(getHorseInfoSuccess(horse))
});
const withSaga = injectSaga({ key: 'my-page',saga});
const withConnect = connect(mapStateToProps,mapDispatchToProps);
export default compose(
    withSaga,
    withConnect
)(MyPage)
