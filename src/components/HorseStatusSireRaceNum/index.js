import React from 'react'
import PropTypes from 'prop-types'

export default function SireRaceNum(props){
  return (
      <div style={props.style}>
        <p style={styles.sireRaceNumP}>Remaining Sire Number<span style={styles.statusParamNum}>{props.sireIndex}</span></p>
        <p style={styles.sireRaceNumP}>Remaining Race Number<span style={styles.statusParamNum}>{props.raceIndex}</span></p>
      </div>
  )
}

SireRaceNum.propTypes={
  style: PropTypes.object.isRequired,
  sireIndex: PropTypes.number.isRequired,
  raceIndex: PropTypes.number.isRequired
};

const styles = {
  statusParamNum: {
    position: 'absolute',
    right: '0'
  },
  sireRaceNumP: {
    lineHeight: '15px',
    height: '15px',
    textAlign: 'left',
    marginTop: '7px',
    fontSize: '15px'
  }
};
