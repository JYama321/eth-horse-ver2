import React,{Component} from 'react'
import {
  activityCard,
  activityOneLine,
  cardImg
} from "./styles";
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const saleLog = 'https://image.eth-horse.com/static_assets/activity-icon-sell-horse.png';
const boughtLog = 'https://image.eth-horse.com/static_assets/activity-icon-buy-horse.png';
const hostRaceLog = 'https://image.eth-horse.com/static_assets/activity-icon-host-race.png';
const applyRaceLog = 'https://image.eth-horse.com/static_assets/activity-icon-apply-race.png';
const toMarketLog = 'https://image.eth-horse.com/static_assets/activity-icon-to-market.png';
const betRaceLog = 'https://image.eth-horse.com/static_assets/activity-icon-bet-race.png';

class ActivityCardSmall extends Component{
  static propTypes={
    event: PropTypes.string.isRequired,
    args: PropTypes.object.isRequired
  };
  renderCard(event,args){
    switch (event){
      case 'Transfer':
        if(args._from === window.web3.eth.coinbase){
          return (
              <div style={activityCard.eventBase} className='activity-sell-horse'>
                <img
                    style={cardImg.wide}
                    src={saleLog}
                />
                <p style={activityOneLine}>Sell <Link to={'/horses/' + args._tokenId}>Horse</Link> to {args._to} </p>
              </div>);
        } else {
          return (
              <div style={activityCard.eventBase} className='activity-buy-horse'>
                <img
                    style={cardImg.wide}
                    src={boughtLog}
                />
                <p style={activityOneLine}>Buy <Link to={'/horses/' + args._tokenId}>Horse</Link> from {args._from} </p>
              </div>);
        }
      case 'HostRace':
        const deposit = window.web3.fromWei(args._deposit,'ether');
        const minWinnerPrize = window.web3.fromWei(args._minWinnerPrize,'ether');
        return (
            <div style={activityCard.eventBase} className='activity-host-race'>
              <img
                  style={cardImg.wide}
                  src={hostRaceLog}
              />
              <p style={activityOneLine}>HostRace
                &nbsp;
                <Link to={"/races/" + args._raceId}>The Race</Link>
                &nbsp;
                Deposit: {deposit == '0' ? 0 : deposit.toFixed(2)} ETH
                <br/>
                Min WinnerPrize: {minWinnerPrize == '0' ? 0 : minWinnerPrize.toFixed(2)} ETH
              </p>
            </div>
        );
      case 'LotteryLog':
        return (
            <div style={activityCard.eventBase} className='activity-host-race'>
              <img
                  style={cardImg.wide}
                  src={toMarketLog}
              />
              <p style={activityOneLine}>
                Did a Lottery{args._success ? 'You win a prize!' : 'You couldn\'t win a prize.'}
              </p>
            </div>
        );
      case 'BetRace':
        return (
            <div style={activityCard.eventBase} className='activity-bet-race'>
              <img
                  style={cardImg.small}
                  src={betRaceLog}
              />
              <p style={activityOneLine}>Bet Race Price {window.web3.fromWei(args._betValue,'ether').toFixed(3)} ETH to &nbsp;
                <Link to={'/races/' + args._raceId}>Race</Link></p>
            </div>
        );
      case 'HorseOnSale':
        return (
            <div style={activityCard.eventBase} className='activity-to-market'>
              <img
                  style={cardImg.wide}
                  src={toMarketLog}
              />
              <p style={activityOneLine}><Link to={'/horses/' + args._tokenId}>Horse</Link> to {args._type} Market Price ETH </p>
            </div>
        );
      case 'ApplyRace':
        return (
            <div style={activityCard.eventBase} className='activity-apply-race'>
              <img
                  style={cardImg.wide}
                  src={applyRaceLog}
              />
              <p style={activityOneLine}>Apply to
                <Link to={"/races/"+  args._raceId.toNumber()}> Race</Link>&nbsp;
                <Link to={"/horses/"+  args._horseId.toNumber()}> The Horse</Link>
              </p>
            </div>
        );
      case 'HorseOnBidSale':
        return (
            <div style={activityCard.eventBase} className='activity-to-market'>
              <img
                  style={cardImg.default}
                  src={toMarketLog}
              />
              <p style={activityOneLine}>Horse to Auction
                <Link to={"/horses/"+  args._tokenId.toNumber()}> The Horse</Link>
              </p>
            </div>
        );
      default:
        return null
    }
  }
  render(){
    return(
        this.renderCard(this.props.event,this.props.args)
    )
  }
}


export default ActivityCardSmall;
