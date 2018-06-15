import React,{Component} from 'react';
import MenuItem from './menuItem'
import {headerStyles} from "./styles";
import { changeCurrentDispRaces } from "./actions";
import { connect } from 'react-redux'

class Header extends Component {
  renderHeaderLeft(){
    return(
        <div style={headerStyles.headerLeftMarket}>
          <button style={headerStyles.headerLeftButtonMarket} onClick={() => this.props.changeRaceDisp('not-ended')}>
            not Ended
          </button>
          <button style={headerStyles.headerLeftButtonMarket} onClick={() => this.props.changeRaceDisp('ended')}>
            Ended
          </button>
          <button style={headerStyles.headerLeftButtonMarket} onClick={() => this.props.changeRaceDisp('my-races')}>
            My Races
          </button>
        </div>
    )
  }
  renderHeaderRight(){
    return(
        <div>
          ETH
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
              <MenuItem path={'/my-horses'} pathName={'MyHorses'}/>
              <MenuItem path={'/market-place'} pathName={'Market'}/>
              <MenuItem path={'/races'} pathName={'Race'}/>
              <MenuItem path={'/events'} pathName={'Events'}/>
              <MenuItem path={'/activities'} pathName={'Activity'}/>
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

const matStateToProps = () => ({

});
const mapDispatchToProps = (dispatch) => ({
  changeRaceDisp: (raceType) => dispatch(changeCurrentDispRaces(raceType))
});


export default connect(matStateToProps,mapDispatchToProps)(Header);
