import React,{Component} from 'react';
import HeaderMenuItem from './menuItem'
import {headerStyles} from "./styles";
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'
import {
    changeCurrentDispRaces,
    changeMyPageCurrentDisplay,
    changeMarketSort,
    changeMarketType
} from "./actions";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
    selectRaceCurrentDisp,
    selectMyPageCurrentDisp,
    selectMarketSort,
    selectMarketType
} from './selectors'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        bottom: '25px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Header extends Component {
    static propTypes={
        balance: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            location: ''
        }
    }
    onChangeSort(e){
        this.props.changeSort(e.target.value)
    }
    onChangeMarketType(e){
        this.props.changeMarket(e.target.value)
    }
    renderHeaderLeft(path,num){
        switch(path){
            case 'races':
                if(!num){
                    return(
                        <div style={headerStyles.headerLeftMarket}>
                            <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'now-wanted')} onClick={() => this.props.changeRaceDisp('now-wanted')}>
                                now wanted
                            </button>
                            <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'now-betting')} onClick={() => this.props.changeRaceDisp('now-betting')}>
                                now betting
                            </button>
                            <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'ended')} onClick={() => this.props.changeRaceDisp('ended')}>
                                ended
                            </button>
                            <button style={headerStyles.headerLeftButtonMarket(this.props.currentDisplay === 'my-races')} onClick={() => this.props.changeRaceDisp('my-races')}>
                                My Races
                            </button>
                        </div>
                    );
                }else {
                    return null;
                }
            case 'my-page':
                return(
                    <div style={headerStyles.headerLeftMarket}>
                        <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'status')} onClick={() => this.props.changeMyPageDisp('status')}>
                            Status
                        </button>
                        <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'my-horses')} onClick={() => this.props.changeMyPageDisp('my-horses')}>
                            Your Horses
                        </button>
                        <button style={headerStyles.headerLeftButtonMarket(this.props.myPageCurrentDisplay === 'activity')} onClick={() => this.props.changeMyPageDisp('activity')}>
                            Activity
                        </button>
                    </div>
                );
            case 'market-place':
                const { classes } = this.props;
                return(
                    <div style={headerStyles.headerLeftMarket}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="market-sort">Sort</InputLabel>
                            <Select
                                value={this.props.marketSort}
                                onChange={e=>this.onChangeSort(e)}
                                inputProps={{
                                    name: 'sort',
                                    id: 'market-sort',
                                }}
                            >
                                <MenuItem value={'default'}>Default</MenuItem>
                                <MenuItem value={'high-price'}>High Price</MenuItem>
                                <MenuItem value={'low-price'}>Low Price</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="market-sort">Market Type</InputLabel>
                            <Select
                                value={this.props.marketType}
                                onChange={e=>this.onChangeMarketType(e)}
                                inputProps={{
                                    name: 'market-type',
                                    id: 'market-type',
                                }}
                            >
                                <MenuItem value={'buy-horse'}>Buy Horse</MenuItem>
                                <MenuItem value={'sire-horse'}>Sire Horse</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                );
            default:
                return null
        }
    }
    renderHeaderRight(){
        return(
            <div style={headerStyles.headerRightBalance}>
                {this.props.balance} ETH
            </div>
        )
    }
    renderHeaderBottom(){
        const path = this.props.pathname.split('/')[1];
        const num = this.props.pathname.split('/')[2];
        if(path === '' || path === 'horses' || this.props.pathname.indexOf('/market-place/sire/') === 0){
            return null
        }else {
            return (
                <div style={headerStyles.headerBottomContainer}>
                    <div style={headerStyles.headerBottomContents}>
                        <div style={headerStyles.headerBottomLeft}>
                            {this.renderHeaderLeft(path,num)}
                        </div>
                        <div style={headerStyles.headerBottomRight}>
                            {this.renderHeaderRight()}
                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div style={headerStyles.container} className='header-container'>
                <div style={headerStyles.headerTopContainer}>
                    <div style={headerStyles.headerMenuContainer}>
                        <div style={headerStyles.headerTitle}>
                            <h1 style={headerStyles.headerTitleH1} >
                                <button onClick={()=>this.props.history.push('/')} style={{background:'transparent',outline:'none',border: 'none'}}>Eth Horse</button>
                            </h1>
                        </div>
                        <div style={headerStyles.headerRightMenu}>
                            <HeaderMenuItem path={'/my-page'} pathName={'MyPage'} currentPath={this.props.pathname}/>
                            <HeaderMenuItem path={'/market-place'} pathName={'Market'} currentPath={this.props.pathname}/>
                            <HeaderMenuItem path={'/races'} pathName={'Race'} currentPath={this.props.pathname}/>
                            <HeaderMenuItem path={'/events'} pathName={'Events'} currentPath={this.props.pathname}/>
                            <HeaderMenuItem path={'/ranking'} pathName={'Ranking'} currentPath={this.props.pathname}/>
                        </div>
                    </div>
                </div>
                {this.renderHeaderBottom()}
            </div>
        )
    }
}

const matStateToProps = () => createStructuredSelector({
    currentDisplay: selectRaceCurrentDisp(),
    myPageCurrentDisplay: selectMyPageCurrentDisp(),
    marketSort: selectMarketSort(),
    marketType: selectMarketType()
});
const mapDispatchToProps = (dispatch) => ({
    changeRaceDisp: (raceType) => dispatch(changeCurrentDispRaces(raceType)),
    changeMyPageDisp: (page) => dispatch(changeMyPageCurrentDisplay(page)),
    changeSort: sort => dispatch(changeMarketSort(sort)),
    changeMarket: type => dispatch(changeMarketType(type))
});

const withConnect = connect(matStateToProps,mapDispatchToProps)

export default compose(
    withConnect
)(withRouter(withStyles(styles)(Header)))
