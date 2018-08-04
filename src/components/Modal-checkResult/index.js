import React, { Component } from 'react'
import Modal from 'react-modal'
import {Link} from "react-router-dom"
import { style } from './styles'
import PropTypes from 'prop-types'

Modal.setAppElement('#root');

class ModalCheckResult extends Component{

    static propTypes = {
        gene1: PropTypes.string.isRequired,
        gene2: PropTypes.string.isRequired,
        winnerHorseIndex: PropTypes.string.isRequired,
        winnerHorseName: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        raceId: PropTypes.number
    };

    openRaceMovie(url){
        window.open(url,null,'width=800,height=450,top=100,location=no,scrollbars=no,status=no,resizable=no')
    }
    render(){
        const {gene1,gene2,winnerHorseIndex,winnerHorseName, isOpen, closeModal} = this.props;
        return(
            <Modal
                isOpen={isOpen}
                style={style.raceResultModal}
                onRequestClose={closeModal}
            >
                <div style={style.raceResultHeader}>
                    check race result
                </div>
                <div style={style.raceResultContent}>
                    <div style={style.raceResultLink}>
                        <button onClick={()=>this.openRaceMovie('https://scenes.eth-horse.com/StartScenes/StartScene.html?' +
                        'c550c=' + gene1.slice(gene1.length-38,gene1.length-20) +
                        '&e4982=' + gene2.slice(gene2.length-38,gene2.length-20) +
                        '&ce40c=' + winnerHorseIndex +
                        '&27b7e9=' + winnerHorseName) } style={style.showRaceMovie} className={'check-result'}>See Race Movie</button>
                    </div>
                    or
                    <div style={style.raceResultLink} className='check-result'>
                        <Link to={'/races/' + this.props.raceId}>Just check result</Link>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ModalCheckResult