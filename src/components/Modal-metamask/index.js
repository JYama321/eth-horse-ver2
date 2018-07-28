import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import {styles} from "./styles";
Modal.setAppElement('#root');

class MetaMaskModal extends Component{
    static propTypes = {
        isModalOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
    };

    render(){
        return(
            <div>
                <Modal
                    isOpen={this.props.isModalOpen}
                    onRequestClose={this.props.closeModal}
                    style={styles.modalContainer}
                >
                    <div style={styles.modalHeader}>
                        <p style={styles.modalTitle}>Wanna play ?</p>
                        <p style={styles.modalText}>You'll need a safe place to store all of your adorable ETH Horse</p>
                    </div>
                    <div style={styles.modalImageContainer}>
                        <img
                            src={require('../../assets/static_assets/metamask.png')}
                            style={{height: '180px',width: 'auto', marginTop: '60px'}}
                        />
                    </div>
                    <div style={styles.modalBottomContent}>
                        <p style={styles.modalBottomText}>
                            The perfect place is in a secure wallet like MetaMask.<br/>
                            This will also act as your login to the game (no extra password needed).
                        </p>
                        <div style={styles.modalBottomButton}>
                            <a href='https://metamask.io/' target='_blank'>
                            <button style={styles.downloadButton}>
                                Download Metamask
                            </button>
                            </a>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

export default MetaMaskModal