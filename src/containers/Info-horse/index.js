import React, { Component } from 'react'
import {horseInfoStyles} from "./horseInfoStyles";
import HorseImage from '../../components/HorseImage/'
import HorseInfoLeft from '../../components/HorseInfoLeftComp/'
import Modal from 'react-modal'
import {horseInfoPageStyles, sellHorseModalStyle} from "./styles"
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import HorseInfoParents from '../../components/HorseInfoParents'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectHorseIdToHorseInfo,
  selectIsHorseInfoLoading
} from './selectors'
import {
  startGetHorseInfo
} from "./actions";
import saga from './saga'
import injectSaga from '../../utils/injectSaga'
import {horseToOnSale} from "../../utils/eth-function";

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
    if(!this.props.horseIdToInfo.get(this.props.match.params.id)){
      this.props.startGetHorseInfo(this.props.match.params.id)
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
                  <HorseImage type={'large'} horseGene={this.props.horseIdToInfo.get(this.props.match.params.id) ? this.props.horseIdToInfo.get(this.props.match.params.id)[1].c.join(',').replace(/,/g,'') : '000000000'}/>
                  <button
                      style={horseInfoStyles.sellHorseModalButton}
                      className='sellHorseButton'
                      onClick={()=>this.openSellHorseModal()}
                  >Sell Horse</button>
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
  isHorseInfoLoading: selectIsHorseInfoLoading()
});

const mapDispatchToProps = (dispatch) => ({
  startGetHorseInfo: (id)=>dispatch(startGetHorseInfo(id)),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'horseInfo',saga});

export default compose(
    withConnect,
    withSaga
)(withStyles(styles)(HorseInfo))
