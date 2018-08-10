import React, { Component } from 'react'
import {
    checkResult,
    getRace,
    getRaceBetEndTime,
    getRaceCommitEndTime,
} from "../../utils/eth-function";
import {calculateDate} from "../../utils/functions";
import PropTypes from 'prop-types'
import {raceCardStyles} from "../RaceCard/styles";


class RaceTimeCard extends Component {
    static propTypes = {
        raceId: PropTypes.number.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            betEndTime: '',
            commitEndTime: '',
            betEndLoaded: false,
            betEndRowDate: '',
            commitEndLoaded: false,
            commitEndRowDate: '',
        };
    }

    renderCurrentStateButton(state,isLoaded){
        const raceId = this.props.raceId;
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

    componentDidMount(){
        const self = this;
        const raceId = this.props.raceId;
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
        });
    }

    render(){
        const isLoaded = this.state.betEndLoaded && this.state.commitEndLoaded;
        return this.renderCurrentStateButton()
    }

}