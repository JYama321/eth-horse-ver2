export const styles = (props) =>  ({
  horseStatusCard: {
    width: '228px',
    height: '415px',
    marginLeft: props.isLeft ? '0' : '56px',
  },
  horseStatus: {
    width: '228px',
    height: '225px',
    textAlign: 'left',
    fontSize: '21px',
    marginTop: '21px'
  },
  powerTotal: {
    height: '30px',
    width: '100%',
    marginTop: '30px',
    position: 'relative',
    fontSize: '15px'
  },
  powerTotalP: {
    lineHeight: '30px'
  },
  powerImg: {
    position: 'absolute',
    right: '100px',
    top: 0,
    height: '30px',
    width: 'auto'
  }
});

export const STYLE = {
  powerNum: {
    position: 'absolute',
    right: '106px',
    fontSize: '15px',
    lineHeight: '30px',
    top: 0,
    color: 'white',
    zIndex: 3,
  },
  horseStats: {
    height: '30px',
    width: '100%',
    position: 'relative',
    marginTop: '21px'
  },
  horseStatsP: {
    fontSize: '15px',
    lineHeight: '30px',
    display: 'inline-block',
    marginLeft: '7px'
  },
  horseName: {
    fontSize: '21px',
    marginTop: '27px'
  },
  horsePowerDiagram: {
    height: '30px',
    width: '100%',
    position: 'relative',
    marginTop: '14px'
  },
  strengthParam: function(width){
    return ({
      height: '100%',
      width: width+'%',
      float: 'left',
      backgroundColor: 'rgba(0,0,0,0.2)'
    })
  },
  speedParam: function(width){
    return ({
      height: '100%',
      width: width+'%',
      float: 'left',
      backgroundColor: 'rgba(0,0,0,0.4)'
    })
  },
  staminaParam: function(width){
    return ({
      height: '100%',
      width: width+'%',
      float: 'left',
      backgroundColor: 'rgba(0,0,0,0.6)'
    })
  },
  intelligenceParam: function(width){
    return ({
      height: '100%',
      width: width+'%',
      float: 'left',
      backgroundColor: 'rgba(0,0,0,0.8)'
    })
  },
  luckParam: function(width){
    return ({
      height: '100%',
      width: width+'%',
      float: 'left',
      backgroundColor: 'rgba(0,0,0,1)'
    })
  }
};
