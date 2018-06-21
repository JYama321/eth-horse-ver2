import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const style = (pathName,location) => ({
  width: '20%',
  height: '100%',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '96px',
  borderRight: '1px solid #000',
  backgroundColor: location === pathName ? 'rgba(0,0,0,1)' : 'transparent',
});

class MenuItem extends Component{
  static propTypes = {
    path: PropTypes.string.isRequired,
    pathName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  };
  render () {
    return (
        <div style={style(this.props.path,this.props.location)}>
          <button onClick={()=>this.props.history.push(this.props.path)} style={{
            color: this.props.location === this.props.path ? 'white' : 'black',
            textDecoration: 'none',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent'
          }}>
            {this.props.pathName}
          </button>
        </div>
    )
  }
}

export default withRouter(MenuItem)
