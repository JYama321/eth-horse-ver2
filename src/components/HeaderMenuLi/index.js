import React, {Component} from 'react'
import {styles} from "./styles";
import {Link} from 'react-router-dom'


class HeaderMenuLi extends Component{
  render(){
    return(
        <li style={styles.headerLeftMenuLi}>
          <Link
              to={this.props.path}
          >
            my horses
          </Link>
        </li>
    )
  }
}

export default HeaderMenuLi;
