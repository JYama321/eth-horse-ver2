import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectActivity
} from './selectors'
import { activityPageStyle } from "./styles";
import ActivityCard from '../../components/ActivityCard'

class MyPageActivity extends Component{
  renderCard(){
    return this.props.activity.toArray().sort((a,b) => {
      if(a.args._now < b.args._now){
        return 1
      } else if(a.args._now > b.args._now){
        return -1
      } else {
        return 0
      }
    }).map((elem,index) => {
      return <ActivityCard event={elem.event} args={elem.args} key={elem.event+index}/>
    })
  }

  render(){
    return(
        <div style={activityPageStyle.outerContainer}>
          <div style={activityPageStyle.innerContainer}>
            {this.renderCard()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  activity: selectActivity()
});

export default connect(mapStateToProps)(MyPageActivity)
