export const styles = (props) =>  ({
  horseStatusCard: {
    width: '328px',
    height: '415px',
    marginLeft: props.isLeft ? '0' : '56px',
    position: 'relative'
  },
  horseStatus: {
    width: '228px',
    height: '225px',
    textAlign: 'left',
    fontSize: '21px',
    margin: '0',
    marginTop: '21px',
    marginLeft: '100px'
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
  horseRankNum: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100px',
    height: '100px',
    border: 'none',
    zIndex:'5'
  },
  rankNum: {
    fontSize: '30px',
    color: 'black',
    fontWeight: '800',
    position: 'absolute',
    top: ' 5px',
    left: '5px'
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
