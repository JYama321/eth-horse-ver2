import React,{Component} from 'react';
import injectSaga from '../../utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'
import {
  selectHorseArray,
  selectHorseArrayLoaded
} from "./selectors";

class Top extends Component{
  render(){
    return(
        <div>
          <h1>Top Page</h1>
        </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  horseArrayLoaded: selectHorseArrayLoaded(),
  horseArray: selectHorseArray()
});
export default connect(mapStateToProps)(Top);
