import React from 'react'
import PropTypes from 'prop-types'

export default function HorseStatusGragh(props){
  return (
      <div style={props.style}>
        <span style={style.strengthParam(Number(props.gene.slice(0,3)),0.2)}></span>
        <span style={style.strengthParam(Number(props.gene.slice(3,6)),0.4)}></span>
        <span style={style.strengthParam(Number(props.gene.slice(6,9)),0.6)}></span>
        <span style={style.strengthParam(Number(props.gene.slice(9,12)),0.8)}></span>
        <span style={style.strengthParam(Number(props.gene.slice(12,15)),1)}></span>
      </div>
  )
}
HorseStatusGragh.propTypes={
  gene: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};
const style = {
  strengthParam: (status,backColorAlpha) => ({
    height: '100%',
    float: 'left',
    backgroundColor: `rgba(0,0,0,${backColorAlpha})`,
    width: Math.ceil(status / 1000 * 20)+"%"
  }),
};

