export const myPageStyles = {
  outerContainer: {
    position: 'absolute',
    top: 'calc(256px + 4.5%)',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '1060px'
  },
  innerContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '1080px',
    height: '100%',
    margin: '0 auto'
  },
  statusBox: {
    width: '320px',
    height: '5650px',
    position: 'relative',
    margin: '0 150px 0 90px'
  },
  statusPic: {
    width: '230px',
    height: '230px',
    background: 'linear-gradient(45deg, blue, red)',
    position: 'absolute',
    borderRadius: '115px',
    top: '0',
    right: '45px',
    textAlign: 'center',
    lineHeight: '230px',
    fontSize: '35px',
    zIndex: 1
  },
  statusData: {
    width: '320px',
    height: '450px',
    position: 'relative',
    top: '115px',
    border:' 1px solid #000'
  },
  userNameAddress: {
    height: '30px',
    lineHeight: '30px',
    fontSize: '12px',
    position: 'relative',
    width: '100%',
    top: '160px',
    textAlign: 'center'
  },
  userBalance: {
    height: '30px',
    lineHeight: '30px',
    fontSize: '12px',
    position: 'relative',
    width: '100%',
    top: '220px',
    textAlign: 'center'
  },
  ethBalance: {
    color: 'white',
    width: '160px',
    height: '25px',
    lineHeight: '25px',
    margin: '0 auto',
    position: 'relative',
    top: '220px',
    fontSize: '12px',
    textAlign: 'center',
    backgroundSize: '160px 25px'
  },
  activityBox: {
    width: '520px',
    height: '480px',
    position: 'relative',
  },
  activityTitle: {
    width: '100%',
    height:'30px',
    borderBottom: '1px solid #000',
    textAlign: 'left',
    position: 'relative'
  },
  activityMore: {
    position: 'absolute',
    right: 0
  }
};
