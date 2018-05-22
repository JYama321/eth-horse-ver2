import React, {Component} from 'react'


export default class ModalComponent extends Component{
  constructor(props){
    super(props)
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
  render(){
    if (this.state.isActive) {
      return (
          <div>
            <div
                className={this.state.isActive ? "modal-container" : "modal-container-close"}
            >
              <div className={this.props.isActive ? "modal-base" : "modal-close"}>
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
