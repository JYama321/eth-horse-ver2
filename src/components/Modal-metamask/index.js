import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { styles } from "./styles";
import { browserInstallLinks } from "../../utils/constants";
const icons = {
  chrome: '../../assets/static_assets/browser-chrome.png',
  opera: '../../assets/static_assets/browser-opera.png',
  firefox: '../../assets/static_assets/browser-firefox.png',
  brave: '../../assets/static_assets/browser-brave.png'
};
Modal.setAppElement('#root');

class MetamaskModal extends Component{
    static propTypes = {
        isModalOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
    };

    renderBrowserInstallLink(browserType){
        return(
            <div style={styles.browserCard}>
                <div style={styles.browserText}>
                    Download {browserType}
                </div>
                <a href={browserInstallLinks[browserType.toLowerCase()]} target='_blank'className='hover'>
                    <div style={styles.browserIconContainer}>
                        <img
                            src={require(`../../assets/static_assets/browser-${browserType.toLowerCase()}.png`)}
                            style={{width: 'auto', height: '40px',marginTop: '10px'}}
                        />
                    </div>
                </a>
            </div>
        )
    }

    render(){
        return(
            <div>
                <Modal
                    isOpen={this.props.isModalOpen}
                    onRequestClose={this.props.closeModal}
                    style={styles.modalContainer}
                >
                    <div style={styles.modalHeader}>
                        <p style={styles.headerTitle}>What's this neigh!</p>
                        <p style={styles.headerText}>
                            You can only play ETH Horse on a desktop browser like
                            Chrome, Opera, Firefox or Brave.
                        </p>
                    </div>
                    <div style={styles.modalBottomContent}>
                        {this.renderBrowserInstallLink('Chrome')}
                        {this.renderBrowserInstallLink('Opera')}
                        {this.renderBrowserInstallLink('FireFox')}
                        {this.renderBrowserInstallLink('Brave')}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default MetamaskModal