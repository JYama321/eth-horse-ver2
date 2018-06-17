import React,{Component} from 'react';
import MenuItem from './menuItem'
import {headerStyles} from "./styles";
import {createStructuredSelector} from 'reselect'
import {
  changeCurrentDispRaces,
  changeMyPageCurrentDisplay
} from "./actions";
import { connect } from 'react-redux'
import {
  selectRaceCurrentDisp,
  selectMyPageCurrentDisp
} from './selectors'
import history from '../../utils/history'
import PropTypes from 'prop-types'

class Header extends Component {
  static propTypes={
    balance: PropTypes.number.isRequired
  };
  renderHeaderLeft(){
    const place = history.location.pathname.split('/')[1];
    switch(place){
      case 'races':
        return(
            <div style={headerStyles.headerLeftMarket}>
              <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'now-wanted')} onClick={() => this.props.changeRaceDisp('now-wanted')}>
                now wanted
              </button>
              <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'now-betting')} onClick={() => this.props.changeRaceDisp('now-betting')}>
                now betting
              </button>
              <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'ended')} onClick={() => this.props.changeRaceDisp('ended')}>
                ended
              </button>
              <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'my-races')} onClick={() => this.props.changeRaceDisp('my-races')}>
                My Races
              </button>
            </div>
        );
      case 'my-page':
        return(
            <div style={headerStyles.headerLeftMarket}>
              <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'status')} onClick={() => this.props.changeMyPageDisp('status')}>
                Status
              </button>
              <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'my-horses')} onClick={() => this.props.changeMyPageDisp('my-horses')}>
                My Horses
              </button>
              <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'activity')} onClick={() => this.props.changeMyPageDisp('activity')}>
                Activity
              </button>
            </div>
        )
      default:
        return null
    }
  }
  renderHeaderRight(){
    return(
        <div style={headerStyles.headerRightBalance}>
          {this.props.balance} ETH
        </div>
    )
  }
  render() {
    return (
        <div style={headerStyles.container}>
          <div style={headerStyles.headerTopContainer}>
          <div style={headerStyles.headerMenuContainer}>
            <div style={headerStyles.headerTitle}>
              <h1 style={headerStyles.headerTitleH1}>Eth Horse</h1>
            </div>
            <div style={headerStyles.headerRightMenu}>
              <MenuItem path={'/my-page'} pathName={'MyPage'}/>
              <MenuItem path={'/market-place'} pathName={'Market'}/>
              <MenuItem path={'/races'} pathName={'Race'}/>
              <MenuItem path={'/events'} pathName={'Events'}/>
            </div>
          </div>
          </div>
          <div style={headerStyles.headerBottomContainer}>
            <div style={headerStyles.headerBottomContents}>
              <div style={headerStyles.headerBottomLeft}>
                {this.renderHeaderLeft()}
              </div>
              <div style={headerStyles.headerBottomRight}>
                {this.renderHeaderRight()}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const matStateToProps = () => createStructuredSelector({
  currentDisplay: selectRaceCurrentDisp(),
  myPageCurrentDisplay: selectMyPageCurrentDisp()
});
const mapDispatchToProps = (dispatch) => ({
  changeRaceDisp: (raceType) => dispatch(changeCurrentDispRaces(raceType)),
  changeMyPageDisp: (page) => dispatch(changeMyPageCurrentDisplay(page))
});


export default connect(matStateToProps,mapDispatchToProps)(Header);
