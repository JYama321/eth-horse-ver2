import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {modalBaseStyle} from "./styles";


export default class ModalComponent extends Component{
  static propTypes={
    isActive: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      isActive: false,
      willClose: false
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isActive){
      this.setState({
        isActive: true,
        willClose: false
      })
    } else {
      this.setState({
        willClose: true,
        isActive: false
      })
    }
  }
  closeModal(){
    this.props.closeModal()
  }
  render(){
    if (this.state.isActive) {
      return (
          <div>
            <div
                className={this.state.isActive ? "modal-container" : "modal-container-close"}
                style={modalBaseStyle.modalContainer}
            >
              <div
                  className={this.props.isActive ? "modal-base" : "modal-close"}
                  style={modalBaseStyle.modalContent}
              >
                {this.props.children}
              </div>
            </div>
          </div>
      )
    } else {
      return false;
    }
  }
}
