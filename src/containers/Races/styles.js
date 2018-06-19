export const racePageStyles = {
  outerContainer: {
    position: 'absolute',
    width: '100%',
    height: '1440px',
    top: '255px',
  },
  innerContainer: {
    position: 'relative',
    display: 'flex',
    flexPack: 'justify',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '1080px',
    height: '100%',
    margin: '0 auto'
  },
  headerBottom: {
    width: '100%',
    height: '150px',
    position: 'relative'
  },
  holdRaceButton: {
    fontSize: '16px',
    height: '30px',
    lineHeight: '30px',
    position: 'absolute',
    outline: 'none',
    border: 'none',
    right: 0,
    top: '56px',
  },
  modalContent: {
    top : '50%',
    left  : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    height: '100px',
    position: 'absolute',
    zIndex: 8888
  }
};
