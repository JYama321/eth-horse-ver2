import React, {Component} from 'react'
import {styles} from './styles'
import injectSaga from '../../utils/injectSaga'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  moveMyPageHorsePagination
} from './actions'
import saga from './saga'
import {
  selectHorseArray,
  selectHorseIdToHorseInfo,
  selectHorseIdArray,
} from "./selectors";
import HorseStatusCard from '../../components/HorseStatusCard'
import Pagination from '../../components/Pagination'
const loadingGif = 'https://image.eth-horse.com/static_assets/umaLoading.gif';


class MyPageHorses extends Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1,
      buttonPerPage: 10
    };
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount(){
    this.setState({
      totalPage: Math.ceil(this.props.horseIdArray.toArray().length / 8)
    })
  }

  componentWillReceiveProps(props,state){
    if(this.state.totalPage !== Math.ceil(props.horseIdArray.toArray().length / 8)){
      this.setState({
        totalPage: Math.ceil(props.horseIdArray.toArray().length / 8)
      })
    }
  }

  renderHorses(){
    const self = this;
    const array = this.props.horseIdArray ? this.props.horseIdArray.slice(8*(this.state.currentPage-1),8*this.state.currentPage) : [];
    return array.map(function (elem,index) {
      const isLeft = index % 4 === 0;
      const horse = self.props.horseIdToInfo.get(String(elem.toNumber())) ? self.props.horseIdToInfo.get(String(elem.toNumber())) : null;
      if(horse){
        return (
            <HorseStatusCard
                info={horse}
                isMyHorse={true}
                isLeft={isLeft}
                key={'myhorse-'+index}
            />
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

  onChangePage(currentPage){
    this.setState({
      currentPage: currentPage
    },function(){
      this.props.movePage(currentPage)
    })
  }

  render() {
    return (
        <div style={styles.outerContainer}>
          <div style={styles.innerContainer}>
            {this.renderHorses()}
            <Pagination
                totalPage={this.state.totalPage}
                currentPage={this.state.currentPage}
                buttonPerPage={this.state.buttonPerPage}
                onChangePage={this.onChangePage}
            />
          </div>
        </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  horseArray: selectHorseArray(),
  horseIdArray: selectHorseIdArray(),
  horseIdToInfo: selectHorseIdToHorseInfo()
});
const mapDispatchToProps = (dispatch) => ({
  movePage: (page)=>dispatch(moveMyPageHorsePagination(page))
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({ key: 'my-horse',saga});


export default compose(
    withSaga,
    withConnect
)(MyPageHorses);
