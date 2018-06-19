export const modalStyles = {
  modalContent: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    zIndex: 8888
  },
  horseListContainer: {
    width: '80%',
    height: '400px',
    position: 'absolute',
    margin: 'auto',
    left: '50%',
    top: 'calc(50% + 80px)',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '600px'
  },
  modalTopTitle:{
    width: '100%',
    height: '80px',
    color: 'white',
    backgroundColor: 'black',
    lineHeight: '80px',
    textAlign: 'center'
  },
  horseCardContainer: {
    width: '225px',
    height:  '300px',
    position: 'relative'
  },
  applyRaceButton: {
    width: '150px',
    height: '25px',
    backgroundSize: '150px 25px',
    outline: 'none',
    border: 'none',
    color: 'white'
  },
  pageBackButton: {
    width: '30px',
    height: '30px',
    position: 'absolute',
    left: '3%',
    top: '50%',
    outline: 'none',
    border: 'none'
  },
  pageNextButton: {
    width: '30px',
    height: '30px',
    position: 'absolute',
    right: '3%',
    top: '50%',
    outline: 'none',
    border: 'none'
  }
};
