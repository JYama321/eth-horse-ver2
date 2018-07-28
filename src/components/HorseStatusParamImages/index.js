import React from 'react'
import PropTypes from 'prop-types'
export default function HorseStatusParamImages(props){
  return (
      <div style={props.style}>
        <p style={styles.statusParamDiagramP}>
          <img src={'https://image.eth-horse.com/static_assets/power-square.png'}/>
          &nbsp; strength
          <span style={styles.statusParamNum}>{Math.ceil(Number(props.gene.slice(0,3)) / 100)}</span>
        </p>
        <p style={styles.statusParamDiagramP}>
          <img src={'https://image.eth-horse.com/static_assets/power-square2.png'}/>
          &nbsp; speed
          <span style={styles.statusParamNum}>{Math.ceil(Number(props.gene.slice(3,6)) / 100)}</span>
        </p>
        <p style={styles.statusParamDiagramP}>
          <img src={'https://image.eth-horse.com/static_assets/power-square3.png'}/>
          &nbsp; stamina
          <span style={styles.statusParamNum}>{Math.ceil(Number(props.gene.slice(6,9)) / 100)}</span>
        </p>
        <p style={styles.statusParamDiagramP}>
          <img src={'https://image.eth-horse.com/static_assets/power-square4.png'}/>
          &nbsp; intelligence
          <span style={styles.statusParamNum}>{Math.ceil(Number(props.gene.slice(9,12)) / 100)}</span>
        </p>
        <p style={styles.statusParamDiagramP}>
          <img src={'https://image.eth-horse.com/static_assets/power-square5.png'}/>
          &nbsp; luck
          <span style={styles.statusParamNum}>{Math.ceil(Number(props.gene.slice(12,15)) / 100)}</span>
        </p>
      </div>
  )
}

HorseStatusParamImages.propTypes={
  gene: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};

const styles={
  statusParamDiagramP: {
    width: '100%',
    height: '20%',
    lineHeight: '20px',
    fontSize: '15px',
    position: 'relative'
  },
  statusParamImg: {
    height: '20px',
    width: '20px',
  },
  statusParamNum: {
    position: 'absolute',
    right: 0
  }
}
