export const headerStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '256px',
  },
  headerTopContainer: {
    width: '100%',
    height: '96px',
    borderBottom: '1px solid #000'
  },
  headerMenuContainer: {
    width: '1080px',
    height: '96px',
    position: 'relative',
    margin: '0 auto',
    display: 'flex',
  },
  headerBottomContainer: {
    width: '1080px',
    height: '160px',
    position: 'relative',
    margin: '0 auto',
    borderBottom: '2px solid #000'
  },
  headerBottomContents: {
    position: 'absolute',
    width: '100%',
    height: '50px',
    display: 'flex',
    bottom: 0
  },
  headerBottomLeft: {
    height: '100%',
    width: '50%'
  },
  headerBottomRight: {
    height: '100%',
    width: '50%',
    position: 'relative'
  },
  headerRightBalance: {
    width: '150px',
    height: '25px',
    color: 'white',
    position: 'absolute',
    backgroundColor: 'black',
    right: 0,
    top: 0,
    textAlign: 'center'
  },
  headerTitle: {
    fontFamily: '"GoudyOldstyle-Regular", "Arial Narrow"',
    width: '57.5%',
    height: '100%',
    textAlign: 'left'
  },
  headerTitleH1: {
    fontSize: '38px',
    fontWight: '100'
  },
  headerRightMenu: {
    width: '42.5%',
    height: '100%',
    display: 'flex',
    borderLeft: '1px solid #000'
  },
  headerLeftMarket: {
    width: '100%',
    height: '25px',
    display: 'flex',
  },
  headerLeftButtonMarket: function(isDisplayed) {
    if(isDisplayed){
      return {
        lineHeight: '20px',
        fontSize: '14px',
        width: '25%',
        textAlign: 'left',
        outline: 'none',
        border: 'none',
        textDecoration: 'underline',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
      }
    } else {
      return {
        lineHeight: '20px',
        fontSize: '14px',
        width: '25%',
        textAlign: 'left',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent'
      }
    }
  }
};
