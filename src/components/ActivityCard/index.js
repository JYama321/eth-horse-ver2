import React,{Component} from 'react'
import saleLog from '../../assets/static_assets/event-sale.png'
import boughtLog from '../../assets/static_assets/event-buy.png'
import hostRaceLog from '../../assets/static_assets/event-host-race.png'
import applyRaceLog from '../../assets/static_assets/event-applyrace.png'
import {betRace} from "../../utils/functions";
import {
  activityCardWhite,
  activityCardP,
  eventDetail,
  cardImg
} from "./styles";
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


class ActivityCard extends Component{
  static propTypes={
    event: PropTypes.string.isRequired,
    args: PropTypes.object.isRequired
  };
  renderCardWhite(event,args){
    switch (event){
      case 'Transfer':
        return (
            <div style={activityCardWhite.getHorse}>
              <img
                  style={cardImg}
                  src={boughtLog}
              />
              <p style={activityCardP}>get horse</p>
              <p style={eventDetail}>Get <Link to={'/horses/' + args._tokenId}>Horse</Link> from {args._from} </p>
            </div>);
      case 'HostRace':
        const deposit = window.web3.fromWei(args._deposit,'ether');
        const minWinnerPrize = window.web3.fromWei(args._minWinnerPrize,'ether');
        return (
            <div style={activityCardWhite.hostRace}>
              <img
                  style={cardImg}
                  src={hostRaceLog}
              />
              <p style={activityCardP}>Host Race</p>
              <p style={eventDetail}>HostRace
                &nbsp;
                <Link to={"/races/" + args._raceId}>The Race</Link>
                &nbsp;
                Deposit: {deposit == '0' ? 0 : deposit.toFixed(2)} ETH
                &nbsp;
                Min WinnerPrize: {minWinnerPrize == '0' ? 0 : minWinnerPrize.toFixed(2)}
              </p>
            </div>
        );
      case 'BetRace':
        return (
            <div style={activityCardWhite.betRace}>
              <img
                  style={cardImg}
                  src={betRace}
              />
              <p style={activityCardP}>sale horse</p>
              <p style={eventDetail}>Buy Horse Price 3 ETH from  [user address] </p>
            </div>
        );
      case 'HorseOnSale':
        return (
            <div style={activityCardWhite.onBid}>
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
            <div style={activityCardWhite.applyRace}>
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
      case 'HorseOnBidSale':
        return (
            <div style={activityCardWhite.onBid}>
              <img
                  style={cardImg}
                  src={saleLog}
              />
              <p style={activityCardP}>Horse to Auction</p>
              <p style={eventDetail}>Horse to Auction
                <Link to={"/horses/"+  args._tokenId.toNumber()}> The Horse</Link>
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
    return(
        this.renderCardWhite(this.props.event,this.props.args)
    )
  }
}


export default ActivityCard;
