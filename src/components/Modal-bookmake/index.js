import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HorseStatusCard from '../../components/HorseStatusCard'
import { bookMakeModalStyle } from './styles'
import {
    getHorseStrengthBalance,
    decideBetRate,
    getStrengthBalance
} from "../../utils/eth-function";
import Modal from 'react-modal'


Modal.setAppElement('#root');
class BookMakeModal extends Component{
    static propTypes={
        isModalOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        race: PropTypes.array.isRequired,
        horseInfo: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            betRate1: 0,
            betRate2: 0,
            expectedBetRate:[],
            betRates: [],
            loaded: false,
            isOpen: false
        }
    }
    // componentDidMount(){
    //     const self = this;
    //     getHorseStrengthBalance(this.props.race[0].toNumber()).then(function(result){
    //         const sum = result[0].toNumber() + result[1].toNumber();
    //
    //     })
    //
    // }
    componentWillReceiveProps(props){
        const self = this;
        if(props.horseInfo.get(String(props.race[2].toNumber())) && props.horseInfo.get(String(props.race[3].toNumber()))){
            const genes=[
                props.horseInfo.get(String(props.race[2].toNumber()))[1].c.join(',').replace(/,/g,''),
                props.horseInfo.get(String(props.race[3].toNumber()))[1].c.join(',').replace(/,/g,'')
            ];
            this.setState({
                loaded: true
            });
            getStrengthBalance(genes).then(result => {
                const sum = result[0].toNumber() + result[1].toNumber();
                self.setState({
                    expectedBetRate: [(sum / result[0].toNumber()).toFixed(2), (sum / result[1]).toFixed(2)],
                })
            })
        }
    }
    changeBetValue(e,num){
        let rates = this.state.betRates;
        rates[num] = e.target.value;
        this.setState({
            betRates: rates
        })
    }
    renderHorse(horse,num){
        return (
            <div style={bookMakeModalStyle.horseCardContainer}>
                <HorseStatusCard
                    info={horse}
                    isMyHorse={true}
                    isLeft={true}
                />
                <div style={bookMakeModalStyle.applyRaceButton}>expected bet rate: {this.state.expectedBetRate[num]}</div>
                <input
                    value={this.state.betRates[num]}
                    onChange={e=>this.changeBetValue(e,num)}
                    type="number"
                    step="0.01"
                    style={bookMakeModalStyle.inputField}
                    min="1"
                />
            </div>
        )
    }

    onChangeBetRate1(e){
        this.setState({
            betRate1: e.target.value
        })
    }
    onChangeBetRate2(e){
        this.setState({
            betRate2: e.target.value
        })
    }
    decideBetRate(){
        const data = {
            betRate1: Math.ceil(this.state.betRate1 * 100),
            betRate2: Math.ceil(this.state.betRate2 * 100),
            raceId: this.props.raceId
        };
        const self = this;
        this.props.actions.decideBetRate(data).then(function(){
            data.betRate = Math.ceil(this.state.betRate2 * 100);
            self.props.actions.decideBetRate(data)
        })
    }
    render(){
        if(this.state.loaded){
            const horseOne = this.props.horseInfo.get(String(this.props.race[2].toNumber()));
            const horseTwo = this.props.horseInfo.get(String(this.props.race[3].toNumber()));
            const raceId = this.props.race[0].toNumber();
            return(
                <Modal
                    isOpen={this.props.isModalOpen}
                    style={bookMakeModalStyle.modalContent}
                    onRequestClose={this.props.closeModal}
                >
                    <div style={bookMakeModalStyle.modalTopTitle}>
                        Decide Betting Rate
                    </div>
                    <div style={bookMakeModalStyle.horseListContainer}>
                        {this.renderHorse(horseOne,0)}
                        {this.renderHorse(horseTwo,1)}
                    </div>
                    <button style={bookMakeModalStyle.decideBetButton} onClick={()=>decideBetRate(raceId,this.state.betRates)}>decide betting rate</button>
                </Modal>
            )
        }else{
            return null
        }
    }
}

export default BookMakeModal;
