import React,{Component} from 'react'
import saleLog from '../../assets/static_assets/activity-icon-sell-horse.png'
import boughtLog from '../../assets/static_assets/activity-icon-buy-horse.png'
import hostRaceLog from '../../assets/static_assets/activity-icon-host-race.png'
import applyRaceLog from '../../assets/static_assets/activity-icon-apply-race.png'
import toMarketLog from '../../assets/static_assets/activity-icon-to-market.png'
import betRaceLog from '../../assets/static_assets/activity-icon-bet-race.png'
import {
    activityCardContainer,
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
        var image, title, className;
        switch (event){
            case 'Transfer':
                if(args._from === window.web3.eth.coinbase){
                    return (
                        <div style={activityCardContainer.activityCardBase} className='activity-sell-horse'>
                            <img
                                style={cardImg}
                                src={saleLog}
                            />
                            <p style={activityCardP}>Horse Sold</p>
                            <p style={eventDetail}><Link to={'/horses/' + args._tokenId}>Horse</Link> was sold to {args._to} </p>
                        </div>);
                } else {
                    return (
                        <div style={activityCardContainer.activityCardBase} className='activity-buy-horse'>
                            <img
                                style={cardImg}
                                src={boughtLog}
                            />
                            <p style={activityCardP}>Buy horse</p>
                            <p style={eventDetail}>Get <Link to={'/horses/' + args._tokenId}>Horse</Link> from {args._from} </p>
                        </div>);
                }
            case 'LotteryLog':
                console.log(args,'lotteryLog');
                return (
                    <div style={activityCardContainer.activityCardBase} className='activity-host-race'>
                        <img
                            style={cardImg}
                            src={betRaceLog}
                        />
                        <p style={activityCardP}>Lottery</p>
                        <p style={eventDetail}>{args._type} Lottery
                            &nbsp;
                            Did a {args._type} lottery.
                            &nbsp;
                            <span style={{
                                color: args._success ? 'red' : 'blue'
                            }}>{args._success ? 'You win a prize! Congratulations!' : 'You couldn\'t win a prize.'}</span>
                            &nbsp;{args._success ? '' : 'Please do a lottery again!'}
                        </p>
                    </div>
                )
            case 'HostRace':
                const deposit = window.web3.fromWei(args._deposit,'ether');
                const minWinnerPrize = window.web3.fromWei(args._minWinnerPrize,'ether');
                return (
                    <div style={activityCardContainer.activityCardBase} className='activity-host-race'>
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
                            Min WinnerPrize: {minWinnerPrize == '0' ? 0 : minWinnerPrize.toFixed(2)} ETH
                        </p>
                    </div>
                );
            case 'BetRace':
                [image, title, className] =
                    [betRaceLog,'Bet Race', 'activity-bet-race'];
                return (
                    <div style={activityCardContainer.activityCardBase} className={className}>
                        <img
                            style={cardImg}
                            src={image}
                        />
                        <p style={activityCardP}>{title}</p>
                        <p style={eventDetail}>
                            Bet <Link to={'/races/' + args._raceId.toNumber()}>Race</Link>
                            {window.web3.fromWei(args._betValue, 'ether').toFixed(3)} ETH,
                            &nbsp;
                            to <Link to={'/horses/' + args._horseId.toNumber()}>Horse</Link>
                        </p>
                    </div>
                );
            case 'HorseOnSale':
                [image,title,className] =
                    [saleLog,`Horse to ${args._type} Market`,'activity-to-market'];
                return (
                    <div style={activityCardContainer.activityCardBase} className={className}>
                        <img
                            style={cardImg}
                            src={toMarketLog}
                        />
                        <p style={activityCardP}>{title}</p>
                        <p style={eventDetail}>Sell <Link to={'/horses/' + args._tokenId.toNumber()}>Horse</Link> Price {window.web3.fromWei(args._price,'ether').toFixed(3)} ETH to {args._type} Market</p>
                    </div>
                );
            case 'ApplyRace':
                [image, title, className] =
                    [applyRaceLog, 'Apply Race', 'activity-to-market'];
                return (
                    <div style={activityCardContainer.activityCardBase} className={className}>
                        <img
                            style={cardImg}
                            src={image}
                        />
                        <p style={activityCardP}>{title}</p>
                        <p style={eventDetail}>Apply Race to
                            {<Link to={'/races/' + args._raceId.toNumber()}>The Race</Link>},
                            {<Link to={'/horses/' + args._horseId.toNumber()}>The Horse</Link>}</p>
                    </div>
                );
            case 'HorseOnBidSale':
                [image, title, className] =
                    [saleLog, 'Horse to Auction','activity-to-market'];
                return (
                    <div style={activityCardContainer.activityCardBase} className={className}>
                        <img
                            style={cardImg}
                            src={image}
                        />
                        <p style={activityCardP}>{title}</p>
                        <p style={eventDetail}> <Link to={'/horses/' + args._tokenId.toNumber()}>The Horse</Link> to Auction`,</p>
                    </div>
                );
            default:
                return null;
        }
    }
    activityCardContent(img,title,content,className){
        return (
            <div style={activityCardContainer.activityCardBase} className={className}>
                <img
                    style={cardImg}
                    src={boughtLog}
                />
                <p style={activityCardP}>{title}</p>
                <p style={eventDetail}>{content}</p>
            </div>
        )
    }
    render(){
        return(
            this.renderCardWhite(this.props.event,this.props.args)
        )
    }
}


export default ActivityCard;
