import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const style = (pathName,currentpath) => ({
  width: '20%',
  height: '100%',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '96px',
  borderRight: '1px solid #000',
  backgroundColor: currentpath === pathName ? 'rgba(0,0,0,1)' : 'transparent',
});

class MenuItem extends Component{
  static propTypes = {
    path: PropTypes.string.isRequired,
    pathName: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired
  };
  render () {
    return (
        <div style={style(this.props.path,this.props.currentPath)}>
          <button onClick={()=>this.props.history.push(this.props.path)} style={{
            color: this.props.currentPath === this.props.path ? 'white' : 'black',
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
