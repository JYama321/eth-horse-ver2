import React, { Component } from 'react'
import {style} from "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import {commitRace} from "../../utils/eth-function";
import Modal from "react-modal";
import PropTypes from 'prop-types'
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
Modal.setAppElement('#root');

class CommitRaceModal extends Component{
    static propTypes = {
        isModalOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        raceId: PropTypes.number.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            secretNum: 0
        }
    }
    onChangeSecretNum(e){
        this.setState({
            secretNum: e.target.value
        })
    }

    render(){
        const {classes} = this.props;
        return(
            <Modal
                isOpen={this.props.isModalOpen}
                style={style.modal}
                onRequestClose={this.props.closeModal}
            >
                <div style={style.modalTitle}>
                    Confirm your secret number you choose when you bet. This is a security reason.
                </div>
                <div style={style.modalContentField}>
                    Secret Number
                    <TextField
                        value={this.state.secretNum}
                        type='number'
                        inputProps={{step: 1, min: 0}}
                        onChange={e=>this.onChangeSecretNum(e)}
                        style={{marginLeft: '14px'}}
                    />
                </div>
                <div  style={style.modalContentField}>
                    <Button
                        onClick={()=>commitRace(this.props.raceId,this.state.secretNum)}
                        style={{backgroundColor: 'black', color: 'white', fontFamily: 'yrsa-regular'}}
                        className={classes.commitRaceButton}
                    >Confirm</Button>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(CommitRaceModal);