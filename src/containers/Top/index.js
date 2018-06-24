import React,{Component} from 'react';
import injectSaga from '../../utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'
import { topStyles } from "./styles";
import {
  selectHorseArray,
  selectHorseArrayLoaded
} from "./selectors";
import goalGif from '../../assets/static_assets/goal_movie.gif'
import TopTutorialTextures from '../../components/TopTutorialTexture'
class Top extends Component{
  constructor(props){
    super(props);
    this.state={
      tutorialMenu: 'my-page'
    }
  }
  changeTutorial(menu){
    this.setState({
      tutorialMenu: menu
    })
  }
  renderTutorial(menu){
    switch (menu){
      case 'textures':
        return <TopTutorialTextures/>;
      default:
        return null
    }
  }
  render(){
    return(
        <div style={topStyles.outerContainer}>
            <img
                src={goalGif}
                style={topStyles.horseGif}
            />
          <div style={topStyles.innerContainer}>
            <div style={topStyles.topTextContainer}>
              <h2 style={topStyles.topTitle}>What is Eth Horse?</h2>
              <p style={topStyles.ethHorseExplainShort}>Everyone can be an owner of race-horse using blockchin technology</p>
              <p style={topStyles.ethHorseExplain}>
                Ether Horse is an game is a game where you can train, race, and breed your own horses. When your horse wins a race, you can get a prize! You can also vote
                on horses in races and host your own horse races. Furthermore, there are more than seven million kinds of horse appearances and various types of status that
                represent strength! You can also buy and sell rare and strong horses with other users.
              </p>
              <h3 style={topStyles.topSubTitle}>How to Play Game</h3>
              <p style={topStyles.playList}>
                1,
                 Buy and sell your horses.
              </p>
              <p style={topStyles.playList}>
                2,
                 Hold and apply horse-races.
              </p>
              <p style={topStyles.playList}>
                3,
                You can also bet in horse-races.
              </p>
              <p style={topStyles.playList}>
                4,You can find your horse is on various rankings.
              </p>
              <p style={topStyles.ethHorseExplainShort}><b>See tutorials</b> <br/><br/>
              ▽</p>
            </div>
            <div style={topStyles.tutorialContainer}>
              <div style={topStyles.tutorialHeader}>
                <button style={topStyles.tutorialMenus('my-page',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('my-page')}>
                  my page
                </button>
                <button style={topStyles.tutorialMenus('race',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('race')}>
                  race
                </button>
                <button style={topStyles.tutorialMenus('market',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('market')}>
                  market
                </button>
                <button style={topStyles.tutorialMenus('events',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('events')}>
                  events
                </button>
                <button style={topStyles.tutorialMenus('textures',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('textures')}>
                  textures
                </button>
              </div>
              {this.renderTutorial(this.state.tutorialMenu)}
            </div>
            <button style={topStyles.startNowButton}>Start Playing Now</button>
          </div>
        </div>
    )
  }
}
export default (Top);
