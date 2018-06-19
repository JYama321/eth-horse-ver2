import React, { Component } from 'react'
import Modal from 'react-modal'
import { hostRaceModal } from './styles'

class HostRaceModal extends Component{
  constructor(props){
    super(props)
    this.state={
      raceName: '',
      bettingDuration: 0,

    }
  }
  render(){
    return(
        <Modal
            isOpen={this.state.isHostRaceModalOpen}
            style={hostRaceModal.modalContent}
            onRequestClose={()=>this.closeModal()}
        >
          <div style={hostRaceModal.modalTopTitle}>
            Hold Race
          </div>
          <div>

          </div>
        </Modal>
    )
  }
}
