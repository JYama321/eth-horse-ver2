import React,{Component} from 'react';
import MenuItem from './menuItem'
import {headerStyles} from "./styles";

class Header extends Component {
  render() {
    return (
        <div style={headerStyles.container}>
          <div style={headerStyles.innerContainer}>
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
    )
  }
}

export default Header;
