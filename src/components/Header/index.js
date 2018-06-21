import React,{Component} from 'react';
import MenuItem from './menuItem'
import {headerStyles} from "./styles";
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'
import {
  changeCurrentDispRaces,
  changeMyPageCurrentDisplay
} from "./actions";
import { connect } from 'react-redux'
import {
  selectRaceCurrentDisp,
  selectMyPageCurrentDisp
} from './selectors'
import PropTypes from 'prop-types'

class Header extends Component {
  static propTypes={
    balance: PropTypes.string.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      location: ''
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      location: nextProps.history.location.pathname.split('/')[1]
    })
  }
  renderHeaderLeft(){
    switch(this.state.location){
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
  renderHeaderBottom(){
    if(this.state.location == 'horses' || '/'){
      return null
    }else {
      return (
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
      )
    }
  }
  render() {
    return (
        <div style={headerStyles.container}>
          <div style={headerStyles.headerTopContainer}>
          <div style={headerStyles.headerMenuContainer}>
            <div style={headerStyles.headerTitle}>
              <h1 style={headerStyles.headerTitleH1}><button onClick={()=>this.props.history.push('/')} style={{background:'transparent',outline: 'none',border: 'none'}}>Eth Horse</button></h1>
            </div>
            <div style={headerStyles.headerRightMenu}>
              <MenuItem path={'/my-page'} pathName={'MyPage'} place={this.state.location}/>
              <MenuItem path={'/market-place'} pathName={'Market'} place={this.state.location}/>
              <MenuItem path={'/races'} pathName={'Race'} place={this.state.location}/>
              <MenuItem path={'/events'} pathName={'Events'} place={this.state.location}/>
              <MenuItem path={'/ranking'} pathName={'Ranking'} place={this.state.location}/>
            </div>
          </div>
          </div>
          {this.renderHeaderBottom()}
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
