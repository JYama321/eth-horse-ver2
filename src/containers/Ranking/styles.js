export const styles =  {
  outerContainer: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '1070px'
  },
  horseContainer: {
    display: 'flex',
    overflowY: 'scroll',
    position: 'relative',
    top: 'calc(210px + 10.5%)',
    width: '100%',
    height: 'calc(1460px - 10.5%)',
    flexWrap: 'wrap'
  },
  searchComponent: {
    width: '100%',
    height: '25px',
    position: 'absolute',
    top: 'calc(210px + 6%)',
    background: 'black'
  },
  innerContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    width: '1080px',
    height: '100%',
    margin: '100px auto 0'
  }
};
