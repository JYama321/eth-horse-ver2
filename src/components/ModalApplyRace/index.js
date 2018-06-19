import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { modalStyles } from "./styles";
import { applyRace } from "../../utils/eth-function";
import HorseStatusCard from '../../components/HorseStatusCard'
import loadingGif from '../../assets/static_assets/umaloading.gif'
import { connect } from 'react-redux'
import { compose } from 'redux'
import injectSaga from '../../utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import {selectCurrentApplyModalPage} from "./selectors";
import { changeApplyRaceHorsePage } from "./actions";
import saga from './saga'

Modal.setAppElement('#root');

class ApplyRaceModal extends Component{
  static propTypes={
    raceId: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    ownedHorses: PropTypes.array.isRequired,
    horseInfo: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      isOpenModal: false,
      totalPage: 1,
      currentPage: 1,
    }
  }
  componentDidMount(){
    this.setState({
      totalPage: Math.ceil(this.props.ownedHorses.length / 3)
    })
  }
  componentWillReceiveProps(props){
    this.setState({
      isOpenModal: props.isActive,
      currentPage: props.currentPage
    })
  }
  closeModal(){
    this.setState({
      isOpenModal: false
    })
  }
  progressPage(){
    this.props.changePage(this.state.currentPage+1);
  }
  backPage(){
    this.props.changePage(this.state.currentPage-1)
  }

  renderHorses(){
    const self = this;
    const currentDispHorseNum = this.state.currentPage * 3;
    const array = this.props.ownedHorses ? this.props.ownedHorses.slice(currentDispHorseNum-3,currentDispHorseNum) : [];
    return array.map(function (elem,index) {
      const horse = self.props.horseInfo.get(String(elem.toNumber())) ? self.props.horseInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <div style={modalStyles.horseCardContainer} key={'myhorse-'+index}>
              <HorseStatusCard
                  info={horse}
                  isMyHorse={true}
                  isLeft={true}
              />
              <button onClick={()=>applyRace(self.props.raceId,horse[0].toNumber())} style={modalStyles.applyRaceButton} className='bet-button'>Apply Race</button>
            </div>
        )
      }else{
        return(
            <img
                key={'loading-'+index}
                src={loadingGif}
                style={{
                  width: '200px',
                  height: '200px'
                }}
            />
        )
      }
    })
  }


  render(){
    return (
        <Modal
            isOpen={this.state.isOpenModal}
            style={modalStyles.modalContent}
            onRequestClose={this.props.closeModal}
        >
          {this.state.currentPage > 1 ? <button style={modalStyles.pageBackButton} onClick={()=>this.backPage()}>◀</button> : null}
          <div style={modalStyles.modalTopTitle}>
            Apply Race
          </div>
          <div style={modalStyles.horseListContainer}>
            {this.renderHorses()}
          </div>
          {this.state.currentPage < this.state.totalPage ? <button style={modalStyles.pageNextButton} onClick={()=>this.progressPage()}>▶︎</button> : null}
        </Modal>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentPage: selectCurrentApplyModalPage()
});
const mapDispatchToProps = (dispatch) => ({
  changePage: page => dispatch(changeApplyRaceHorsePage(page))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'apply-saga', saga});

export default compose(
    withConnect,
    withSaga
)(ApplyRaceModal);
