export const styles = {
  horseImageBase: {
    origin: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: 1,
    },
    face: {
      position: 'absolute',
      top: '4.0%',
      left: 0,
      width: '28.5%',
      height: '43.8%',
      zIndex: 0
    },
    hair: {
      position: 'absolute',
      top: 0,
      left: '4.2%',
      width: '46.9%',
      height: '45.0%',
      zIndex: 2,
    },
    body: {
      position: 'absolute',
      top: '36.4%',
      left: '26.8%',
      width: '35.8%',
      height: '30.2%',
      zIndex: 2,
    },
    frontLeg: {
      position: 'absolute',
      top: '37.8%',
      left: '15.0%',
      width: '15.4%',
      height: '55.7%',
      zIndex: 0,
    },
    backLeg: {
      position: 'absolute',
      top: '34.7%',
      right: '15.2%',
      width: '30.8%',
      height: '60.8%',
      zIndex: 0,
    },
    tail: {
      position: 'absolute',
      top: '35.8%',
      right: 0,
      width: '30.3%',
      height: '23.5%',
      zIndex: 1
    }
  },
  horseImageCry: {
    face: {
      position: 'absolute',
      top: '13.4%',
      left: 0,
      width: '30.0%',
      height: '34.4%',
      zIndex: 0
    },
    hair: {
      position: 'absolute',
      top: 0,
      left: '5.9%',
      width: '46.1%',
      height: '45.0%',
      zIndex: 2
    },
    body: {
      position: 'absolute',
      top: '36.4%',
      left: '28.2%',
      width: '34.6%',
      height: '30.0%',
      zIndex: 2
    },
    frontLeg:{
      position: 'absolute',
      top: '37.1%',
      left: '16.8%',
      width: '14.8%',
      height: '56.2%',
      zIndex: 0
    },
    backLeg: {
      position: 'absolute',
      top: '34.7%',
      right: '15.2%',
      width: '30.8%',
      height: '60.8%',
      zIndex: 0
    }
  },
  horseImageAngry: {
    face: {
      position: 'absolute',
      top: '12.%',
      left: 0,
      width: '30.0%',
      height: '36.0%',
      zIndex: 0
    },
    hair: {
      position: 'absolute',
      top: 0,
      left: '5.9%',
      width: '46.1%',
      height: '45.0%',
      zIndex: 2
    },
    body: {
      position: 'absolute',
      top: '36.4%',
      left: '28.2%',
      width: '34.6%',
      height: '30.0%',
      zIndex: 2
    },
    frontLeg:{
      position: 'absolute',
      top: '37.1%',
      left: '16.8%',
      width: '14.8%',
      height: '56.2%',
      zIndex: 0
    },
    backLeg: {
      position: 'absolute',
      top: '34.7%',
      right: '15.2%',
      width: '30.8%',
      height: '60.8%',
      zIndex: 0
    }
  },
  horseImageContainer: function(type){
    switch(type){
      case 'normal':
        return {
          display: 'block',
          width: '185px',
          height: '152px',
          backgroundColor: 'linear-gradient(-135deg, rgba(0, 0, 0, 1), rgba(255,35, 0, 1) 50%,rgba(255,219,0,1))',
          position: 'relative',
          margin: '0 auto',
          top: '37px'
        };
      case 'rank':
        return {
          display: 'block',
          width: '200px',
          height: '164px',
          backgroundColor: 'linear-gradient(-135deg, rgba(0, 0, 0, 1), rgba(255,35, 0, 1) 50%,rgba(255,219,0,1))',
          position: 'relative',
          margin: '0',
          marginTop: '60px',
          border: '1px solid rgba(0,0,0,0.1)'
        };
      case 'parents':
        return {
          display: 'block',
          width: '200px',
          height: '164px',
          position: 'relative',
          margin: '0 auto',
          top: '38px'
        };
      case 'large':
        return {
          display: 'block',
          width: '430px',
          height: '352.6px',
          position: 'relative',
          margin: '0 auto',
          top: '135px'
        };
      case 'race-horse':
        return {
          display: 'block',
          width: '380px',
          height: '311px',
          position: 'relative',
          margin: '0 auto',
          top: '67.5px'
        };
      case 'sire':
        return {
          display: 'block',
          width: '255px',
          height: '209.1px',
          position: 'relative',
          margin: '0 auto',
          top: '70px'
        };
      default:
        return {
          display: 'block',
          width: '200px',
          height: '164px',
          backgroundColor: 'linear-gradient(-135deg, rgba(0, 0, 0, 1), rgba(255,35, 0, 1) 50%,rgba(255,219,0,1))',
          position: 'relative',
          margin: '0 auto',
          border: '1px solid rgba(0,0,0,0.1)'
        }
    }
  }
}
