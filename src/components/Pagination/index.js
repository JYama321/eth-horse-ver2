import React,{Component} from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

export default class Pagination extends Component{
  static propTypes = {
    totalPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    buttonPerPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.state={
      currentPage: 0,
      totalPage: 0,
      buttonPerPage: 0
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      totalPage: nextProps.totalPage,
      currentPage: nextProps.currentPage,
      buttonPerPage: nextProps.buttonPerPage
    })
  }
  clickButton(value){
    this.props.onChangePage(value)
  }
  renderButton(){
    let buttons = [];
    for(let i=0;i<this.state.totalPage;i++){
      let button = (<Button
          key={i}
          value={i+1}
          onClick={()=>this.clickButton(i+1)}
          style={{backgroundColor: i+1 === this.state.currentPage ? 'rgba(200,50,50,0.5)' : 'rgba(0,0,0,0)'}}
      >
        {i+1}
      </Button>);
      buttons.push(button)
    }
    return buttons
  }

  render(){
    return(
        <div style={{width: '100%', height: '50px'}}>
          {this.renderButton()}
        </div>
    )
  }
}
