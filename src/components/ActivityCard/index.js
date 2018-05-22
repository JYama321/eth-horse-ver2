import React,{Component} from 'react'
import saleLog from '../../assets/static_assets/event-sale.png'
import boughtLog from '../../assets/static_assets/event-buy.png'
import hostRaceLog from '../../assets/static_assets/event-host-race.png'
import applyRaceLog from '../../assets/static_assets/event-applyrace.png'
import {betRace} from "../../utils/functions";
import {
  activityCard,
  activityCardWhite,
  activityCardP,
  eventDetail,
  cardImg
} from "./styles";
import {Link} from 'react-router-dom'


class ActivityCard extends Component{
  renderCard(event,args){
    switch (event){
      case 'Transfer':
        console.log(args)
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={boughtLog}
              />
              <p style={activityCardP}>get horse</p>
              <p style={eventDetail}>event Get Horse from {args._from} </p>
            </div>);
      case 'HostRace':
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={hostRaceLog}
              />
              <p style={activityCardP}>Host Race</p>
              <p style={eventDetail}>event HostRace
                <Link to={"/races/" + args._raceId}>The Race</Link>
              </p>
            </div>
        );
      case 'BetRace':
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={betRace}
              />
              <p style={activityCardP}>sale horse</p>
              <p style={eventDetail}>event Buy Horse Price 3 ETH from  [user address] </p>
            </div>
        );
      case 'HorseOnSale':
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>sell horse</p>
              <p style={eventDetail}>event Sell Horse Price ${} ETH from  [user address] </p>
            </div>
        );
      case 'ApplyRace':
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={applyRaceLog}
              />
              <p style={activityCardP}>Apply Race</p>
              <p style={eventDetail}>event Apply Race to <Link to={"/races/"+  args._raceId.toNumber()}>Race</Link></p>
            </div>
        );
      default:
        return (
            <div style={activityCard}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>sale horse</p>
              <p style={eventDetail}>event Buy Horse Price 3 ETH from  [user address] </p>
            </div>
        )

    }
  }
  renderCardWhite(event,args){
    switch (event){
      case 'Transfer':
        console.log(args)
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={boughtLog}
              />
              <p style={activityCardP}>get horse</p>
              <p style={eventDetail}>event Get Horse from {args._from} </p>
            </div>);
      case 'HostRace':
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={hostRaceLog}
              />
              <p style={activityCardP}>Host Race</p>
              <p style={eventDetail}>event HostRace
                <Link to={"/races/" + args._raceId}>The Race</Link>
              </p>
            </div>
        );
      case 'BetRace':
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={betRace}
              />
              <p style={activityCardP}>sale horse</p>
              <p style={eventDetail}>event Buy Horse Price 3 ETH from  [user address] </p>
            </div>
        );
      case 'HorseOnSale':
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>sell horse</p>
              <p style={eventDetail}>event Sell Horse Price ${} ETH from  [user address] </p>
            </div>
        );
      case 'ApplyRace':
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>Apply Race</p>
              <p style={eventDetail}>event Apply Race to
                <Link to={"/races/"+  args._raceId.toNumber()}> The Race</Link>,
                <Link to={"/horses/"+  args._horseId.toNumber()}> The Horse</Link>
              </p>
            </div>
        );
      default:
        return (
            <div style={activityCardWhite}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>sale horse</p>
              <p style={eventDetail}>event Buy Horse Price 3 ETH from  [user address] </p>
            </div>
        )

    }
  }
  render(){
    if(this.props.num % 2 === 0){
      return(
          this.renderCard(this.props.event,this.props.args)
      )
    }else{
      return(
          this.renderCardWhite(this.props.event,this.props.args)
      )
    }

  }
}


export default ActivityCard;
