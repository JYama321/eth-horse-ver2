import React, { Component } from 'react'

function Container (props) {
  return (
      <div style={styles}>
        {props.children}
      </div>
  )
}

const styles = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0'
};

export default Container;
