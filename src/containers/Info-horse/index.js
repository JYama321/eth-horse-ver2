import React, { Component } from 'react'
import {horseInfoStyles} from "./horseInfoStyles";
import HorseImage from '../../components/HorseImage/'
import HorseInfoLeft from '../../components/HorseInfoLeftComp/'
import Modal from 'react-modal'
import {horseInfoPageStyles, sellHorseModalStyle} from "./styles"
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import HorseInfoParents from '../../components/HorseInfoParents'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectHorseIdToHorseInfo,
  selectIsHorseInfoLoading,
  selectHorseOwner,
} from './selectors'
import {
  startGetHorseInfo,
  getCurrentSearchHorseOwner
} from "./actions";
import saga from './saga'
import injectSaga from '../../utils/injectSaga'
import {
  horseToOnSale,
  buyHorse,
  ownerOf
} from "../../utils/eth-function";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
Modal.defaultStyles.overlay.zIndex='8887';
class HorseInfo extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpenSireModal: false,
      isSellModalOpen: false,
      horsePrice: 0,

    }
  }
  componentDidMount(){
    const self = this;
    if(!this.props.horseIdToInfo.get(this.props.match.params.id)){
      this.props.startGetHorseInfo(this.props.match.params.id);
    } else {
      ownerOf(this.props.match.params.id).then(function(result){
        self.props.getOwner(result);
      })
    }

  }
  moveToSire(){
    this.props.history.push('/horses/' + this.props.match.params.id + '/sire')
  }
  openSellHorseModal(){
    this.setState({
      isSellModalOpen: true
    })
  }
  closeSellHorseModal(){
    this.setState({
      isSellModalOpen: false
    })
  }
  changePrice(e){
    this.setState({
      horsePrice: e.target.value
    })
  }
  renderSellHorseButton(){
    const horseInfo = this.props.horseIdToInfo.get(this.props.match.params.id);
    const price = window.web3.fromWei(horseInfo[8],'ether');
    const horseId = horseInfo[0].toNumber();
    if(this.props.horseOwner === window.web3.eth.coinbase){
      return (
          <button
              style={horseInfoStyles.sellHorseModalButton}
              className='sellHorseButton'
              onClick={()=>this.openSellHorseModal()}
          >
            Sell Horse
          </button>
      )
    } else if(horseInfo[11]){
      return (
          <button
              style={horseInfoStyles.sellHorseModalButton}
              className='sellHorseButton'
              onClick={()=>buyHorse(horseId,price)}
          >
            Buy Horse
          </button>
      )
    } else {
      return null
    }
  }
  renderTopButtons(){
    if(this.props.horseOwner === window.web3.eth.coinbase){
      return (
          <span>
            <button
                style={horseInfoStyles.sireHorseButton}
                className='button-back-transparent'
                onClick={()=>this.moveToSire()}
            >Sire Horse</button>
                  <button
                      style={horseInfoStyles.trainHorseButton}
                      className='button-back-transparent'
                  >training</button>
                  <button
                      style={horseInfoStyles.joinRaceButton}
                      className='button-back-transparent'
                  >join race+</button>
          </span>
      )
    }
  }
  saleInfo(){
    const horseInfo = this.props.horseIdToInfo.get(this.props.match.params.id);
    const price = window.web3.fromWei(horseInfo[8],'ether');
    if(horseInfo[11] || horseInfo[12]){
      return (
          <div style={horseInfoStyles.currentHorsePrice} className='sale-horse-back'>current sale price {price.toFixed(2)} ETH</div>
      )
    }
  }
  render () {
    const { classes } = this.props;
    if(!this.props.isHorseInfoLoading){
      return (
          <div style={horseInfoStyles.outerContainer}>
            <Modal
                isOpen={this.state.isSellModalOpen}
                style={sellHorseModalStyle}
                onRequestClose={()=>this.closeSellHorseModal()}
                contentLabel={'Sample'}
            >
              <span>
              <TextField
                  type='number'
                  label='Price'
                  inputProps={{step: 0.1, min: 0.0}}
                  onChange={e=>this.changePrice(e)}
                  value={this.state.horsePrice}
              />
                ETH
              <Button
                  variant="raised"
                  size='medium'
                  color='primary'
                  style={horseInfoPageStyles.sellButton}
                  className={classes.button}
                  onClick={()=>horseToOnSale(this.props.match.params.id,this.state.horsePrice)}
              >
                SellHorse
              </Button>
              </span>
            </Modal>
            <div style={horseInfoStyles.innerContainer}>
              <div style={horseInfoStyles.horseInfoLeft}>
                <HorseInfoLeft
                    horseInfo={this.props.horseIdToInfo.get(this.props.match.params.id)}
                />
              </div>
              <div style={horseInfoStyles.horseInfoRight}>
                <div style={horseInfoStyles.horseImageBack} className='horse-back'>
                  {this.renderTopButtons()}
                  <HorseImage type={'large'} horseGene={this.props.horseIdToInfo.get(this.props.match.params.id) ? this.props.horseIdToInfo.get(this.props.match.params.id)[1].c.join(',').replace(/,/g,'') : '000000000'}/>
                  {this.saleInfo()}
                  {this.renderSellHorseButton()}
                </div>
                <div style={horseInfoStyles.horseParentsContainer}>
                  <div style={horseInfoStyles.horseParentsTop}>
                    <p style={horseInfoStyles.parentsPlaceText}>parents /</p>
                  </div>
                  <HorseInfoParents
                      papaId={this.props.horseIdToInfo.get(this.props.match.params.id)[5].toNumber()}
                      mamaId={this.props.horseIdToInfo.get(this.props.match.params.id)[4].toNumber()}
                  />
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return null
    }
  }
}


const mapStateToProps = () => createStructuredSelector({
  horseIdToInfo: selectHorseIdToHorseInfo(),
  isHorseInfoLoading: selectIsHorseInfoLoading(),
  horseOwner: selectHorseOwner()
});

const mapDispatchToProps = (dispatch) => ({
  startGetHorseInfo: id => dispatch(startGetHorseInfo(id)),
  getOwner: owner => dispatch(getCurrentSearchHorseOwner(owner))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'horseInfo',saga});

export default compose(
    withConnect,
    withSaga
)(withStyles(styles)(HorseInfo))
