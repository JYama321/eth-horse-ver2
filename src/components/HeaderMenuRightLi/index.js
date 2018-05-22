import React, {Component} from 'react'
import {styles} from "./styles";
import {Link} from 'react-router-dom'


class HeaderMenuRightLi extends Component{
  render(){
    return(
        <li style={styles.headerRightLi}>
          <Link
              to={this.props.path}
          >
            my page
          </Link>
        </li>
    )
  }
}

export default HeaderMenuRightLi
