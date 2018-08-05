import React,{Component} from 'react';
import { topStyles } from "./styles";
import TopTutorialTextures from '../../components/TopTutorialTexture'
const goalGif = 'https://image.eth-horse.com/static_assets/goal_movie.gif';

class Top extends Component{
    constructor(props){
        super(props);
        this.state={
            tutorialMenu: 'my-page',
            loaded: false
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
                return this.renderYoutube(menu);
        }
    }

    renderYoutube(type){
        switch (type) {
            case 'my-page':
                return (<div style={topStyles.youtubeContainer}>
                        <iframe width="920" height="518" src="https://www.youtube.com/embed/ej1NB0WaHIY?autoplay=1" frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen/>
                        </div>);
            case 'race':
                return (<div style={topStyles.youtubeContainer}>
                        <iframe width="920" height="518" src="https://www.youtube.com/embed/Hmq8Gl71fF8?autoplay=1" frameBorder="0"
                                allow="autoplay; encrypted-media" allowFullScreen/>
                        </div>
                );
            case 'market':
                return (<div style={topStyles.youtubeContainer}>
                            <iframe width="920" height="518" src="https://www.youtube.com/embed/LoB3d51jpkI?autoplay=1" frameBorder="0"
                                allow="autoplay; encrypted-media" allowFullScreen/>
                        </div>)
            case 'events':
                return (<div style={topStyles.youtubeContainer}>
                            <iframe width="920" height="518" src="https://www.youtube.com/embed/5GTSHvQkxWw?autoplay=1" frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen/>
                        </div>);
            case 'ranking':
                return (<div style={topStyles.youtubeContainer}>
                            <iframe width="920" height="518" src="https://www.youtube.com/embed/MjAZZ9uRcjU?autoplay=1" frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen/>
                        </div>);
            default:
                return null;
        }
    }
    moveToMyPage(){
        this.props.history.push('/my-page');
        window.scrollTo(0,0)
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
                            Ether Horse is a game where you can train, race, and breed your own horses. When your horse wins a race, you can get a prize! You can also vote
                            on horses in races and hold your own horse races. Furthermore, there are more than seven million kinds of horse appearances and various types of status that
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
                            <button style={topStyles.tutorialMenus('events',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('ranking')}>
                                Ranking
                            </button>
                            <button style={topStyles.tutorialMenus('textures',this.state.tutorialMenu)} onClick={()=>this.changeTutorial('textures')}>
                                textures
                            </button>
                        </div>
                        {this.renderTutorial(this.state.tutorialMenu)}
                    </div>
                    <button style={topStyles.startNowButton} onClick={()=>this.moveToMyPage()}>Start Playing Now</button>
                </div>
            </div>
        )
    }
}
export default (Top);
