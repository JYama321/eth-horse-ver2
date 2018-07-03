export const eventStyles = {
  outerContainer: {
    position: 'absolute',
    top: 'calc(256px + 4.5%)',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '850px'
  },
  innerContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    width: '1080px',
    height: '100%',
    margin: '100px auto 0'
  },
  eventTicket: {
    width: '260px',
    height: '260px',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    left: '50%',
    top: '300px',
    backgroundSize: '260px 260px',
    color: 'white',
    fontSize: '22px'
  },
  buyTicket: {
    width: '120px',
    height: '25px',
    position: 'absolute',
    right: '14px',
    top: '576px',
    backgroundSize: '120px 25px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'left',
    paddingLeft: '15px'
  },
  eventImage: {
    width: '85px',
    height: '85px',
    top: '67.5px',
    left: '87.5px',
    position: 'relative'
  },
  eventText: function(canLot){
    return {
      position: 'relative',
      width: '200px',
      top: '60px',
      left: '30px',
      fontSize: '18px',
      textAlign: 'center',
      color: canLot ? 'white' : 'rgba(230,50,50)'
    }
  },
  lotteryButton: {
    position: 'relative',
    width: '100px',
    height: '20px',
    backgroundSize: '100px 30px',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    lineHeight: '20px',
    top: '65px',
    left: '80px'
  },
  ticketContainer: {
    width: '100%',
    height: '160px',
    top: '28px',
    textAlign: 'center',
    position: 'relative'
  },
  buyTicketText: {
    textAlign: 'center',
    fontSize: '14px',
    width: '100%',
    height: '30px'
  },
  ticketInnerContainer:{
    width: '450px',
    height: '85px',
    margin: '0 auto',
    display: 'flex',
    flexAlign: 'center',
    justifyContent: 'space-between'
  },
  tickerWrapper: {
    width: '85px',
    height: '85px',
    backgroundSize: '85px 85px',
  },
  ticketButton: function(currentType,type){
    return  {
      width: '75px',
      height: '75px',
      backgroundSize: '75px 75px',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'transparent',
      marginLeft: '14px',
      outline: 'none',
      border: 'none',
      opacity: type === currentType ? '0.2' : '1',
      borderRadius: '40px',
      position: 'relative',
      top: '5px',
      right: '8px'
    }
  },
  modalStyle: {
    content: {
      width: '350px',
      height: '150px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      padding: 0,
      transform: 'translate(-50%,-50%)'
    }
  },
  modalTopText: {
    width: '100%',
    height: '30px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};
