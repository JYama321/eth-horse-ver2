export const topStyles = {
  outerContainer: {
    width: '100%',
    height: '2000px',
    position: 'absolute',
    top: 0,
    zIndex: '-1'
  },
  horseGif: {
    width: '100%',
    height: "auto",
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)',
    position: 'absolute',
    top: '0',
    zIndex: '-1'
  },
  innerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, rgb(255,255,255), rgb(255,255,255) 50%, rgba(30,30,255,0.3))',
    margin: '0 auto',
    top: Math.ceil((window.innerWidth / 1.77) * 0.80),
    zIndex: -2
  },
  topTitle: {
    fontSize: '30px',
    lineHeight: '56px'
  },
  topSubTitle: {
    fontSize: '30px',
    lineHeight: '56px',
    marginTop: '70px'
  },
  topTextContainer: {
    width: '1080px',
    height: '880px',
    position: 'relative',
    top: '200px',
    textAlign: 'center',
    margin: '0 auto'
  },
  ethHorseExplainShort: {
    width: '90%',
    margin: '0 auto',
    fontSize: '21px',
    lineHeight: '35px',
    marginTop: '30px',
    wordBreak: 'normal'
  },
  ethHorseExplain: {
    width: '90%',
    margin: '0 auto',
    fontSize: '21px',
    lineHeight: '35px',
    marginTop: '30px',
    wordBreak: 'normal',
    textAlign: 'left'
  },
  playList: {
    width: '90%',
    margin: '0 auto',
    fontSize: '21px',
    lineHeight: '35px',
    wordBreak: 'normal',
    textAlign: 'center',
    marginTop: '35px',
    textDecoration: 'underline'
  },
  tutorialContainer: {
    width: '1080px',
    height: '880px',
    position: 'relative',
    margin: '0 auto',
    top: '250px',
    border: '1px solid #000'
  },
  tutorialHeader: {
    display: 'flex',
    width: '100%',
    height: '70px'
  },
  tutorialMenus: function(page,state){return ({
    width:'20%',
    lineHeight: '70px',
    fontSize: '16px',
    border: '1px solid #000',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: state === page ? 'black' : 'transparent',
    color: state === page ? 'white' : 'black'
  })},
  startNowButton: {
    width: '1080px',
    height: '70px',
    color: 'white',
    background: 'black',
    lineHeight: '70px',
    textAlign: 'center',
    position: 'relative',
    margin: '0 auto',
    display: 'block',
    top: '300px'
  }
};
