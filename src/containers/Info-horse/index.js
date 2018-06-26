import React, { Component } from 'react'
import {horseInfoStyles} from "./horseInfoStyles";
import HorseImage from '../../components/HorseImage/'
import HorseInfoLeft from '../../components/HorseInfoLeftComp/'
import Modal from 'react-modal'
import {horseInfoPageStyles, sellHorseModalStyle} from "./styles"
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
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
  ownerOf,
  horseTokenNotToOnSale,
  horseToSireSale
} from "../../utils/eth-function";
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

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
      sellType: '',
      horsePrice: 0,
      isOpenDialog: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
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
  handleOpenDialog(){
    this.setState({
      isOpenDialog: true
    })
  }
  handleCloseDialog(){
    this.setState({
      isOpenDialog: false
    })
  }
  moveToSire(sireindex){
    if(sireindex !== 0){
      this.props.history.push('/horses/' + this.props.match.params.id + '/sire')
    } else {
      this.handleOpenDialog();
    }
  }
  openSellHorseModal(type){
    this.setState({
      isSellModalOpen: true,
      sellType: type
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
    if(this.props.horseOwner === window.web3.eth.coinbase && !horseInfo[11]){
      return (
          <button
              style={horseInfoStyles.sellHorseModalButton}
              className='sellHorseButton'
              onClick={()=>this.openSellHorseModal('sell')}
          >
            Sell Horse
          </button>
      )
    } else if(this.props.horseOwner === window.web3.eth.coinbase && horseInfo[11]){
      return (
          <button
              style={horseInfoStyles.sellHorseModalButton}
              className='sellHorseButton'
              onClick={()=>horseTokenNotToOnSale(horseId)}
          >
            Stop Selling
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
      const horseInfo = this.props.horseIdToInfo.get(this.props.match.params.id);
      const sireIndex = horseInfo[6].toNumber();
      return (
          <span>
            <button
                style={horseInfoStyles.sireMarketButton}
                className='button-back-transparent'
                onClick={()=>this.openSellHorseModal('sire')}
            >
              Sire Market
            </button>
            <button
                style={horseInfoStyles.sireHorseButton}
                className='button-back-transparent'
                onClick={()=>this.moveToSire(sireIndex)}
            >
              Sire Horse
            </button>
            <button
                style={horseInfoStyles.trainHorseButton}
                className='button-back-transparent'
            >training</button>
            <button
                style={horseInfoStyles.joinRaceButton}
                className='button-back-transparent'
            >join race+
            </button>
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
  horseToMarket(){
    switch (this.state.sellType){
      case 'sell':
        horseToOnSale(this.props.match.params.id,this.state.horsePrice)
        break;
      case '':
        horseToSireSale(this.props.match.params.id,this.state.horsePrice);
        break;
      default:
        return null;
    }
  }
  render () {
    const { classes } = this.props;
    if(!this.props.isHorseInfoLoading){
      return (
          <div style={horseInfoStyles.outerContainer}>
            <Dialog
                open={this.state.isOpenDialog}
                onClose={this.handleCloseDialog}
                arial-labelledby='alert-dialog-title'
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                No More Sire Index!
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This horse cannot sire anymore.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseDialog} color='secondary'>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
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
                  onClick={()=>this.horseToMarket()}
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
