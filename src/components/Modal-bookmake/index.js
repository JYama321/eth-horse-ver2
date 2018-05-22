import React, {Component} from 'react'
import ModalComponent from '../Modal-base/'
import RaceAppliedHorseList from "../ModalAppliedHorseList";
class BookMakeModal extends Component{
  constructor(props) {
    super(props);
    this.state={
      horses: [],
      betRate1: 0,
      betRate2: 0,
      raceId: 0
    }
  }
  componentWillReceiveProps(nextProps,prevState){
    if(nextProps.raceId !== prevState.raceId){
      const self = this;
      self.setState({
        horses: nextProps.horses,
        raceId: nextProps.raceId
      })
    }
  }

  closeModal(){
    this.props.actions.changeBookMakeModal()
  }
  onChangeBetRate1(e){
    this.setState({
      betRate1: e.target.value
    })
  }
  onChangeBetRate2(e){
    this.setState({
      betRate2: e.target.value
    })
  }
  // decideBetRate(){
  //   const data = {
  //     betRate1: Math.ceil(this.state.betRate1 * 100),
  //     betRate2: Math.ceil(this.state.betRate2 * 100),
  //     raceId: this.props.raceId
  //   };
  //   const self = this;
  //   this.props.actions.decideBetRate(data).then(function(){
  //     data.betRate = Math.ceil(this.state.betRate2 * 100);
  //     self.props.actions.decideBetRate(data)
  //   })
  // }
  render(){
    const horse = this.state.horses.map((elem,index) => {
      return(
          <div
              className="apply-horse-content-container"
              key={index}
          >
            <RaceAppliedHorseList
                name={elem[1]}
                gene={elem[2].c.join(',').replace(/,/g,'')}
                remainRaceNum={elem[7].toNumber}
            />
          </div>
      )
    });
    let strengths=[];
    // if(this.state.horses.length ===2){
    //   strengths = functions.returnExpectedBetRate(
    //       [this.state.horses[0] ? this.state.horses[0][2].c.join(',').replace(/,/g,'') : "12345",
    //         this.state.horses[1] ? this.state.horses[1][2].c.join(',').replace(/,/g,'') : "12345"]
    //   )
    // }
    return(
        <ModalComponent
            isActive={this.props.isModalOpen}
        >
          <div className="apply-race-modal-contents">
            <div className="apply-horse-list">
              {horse}
            </div>
            <div className="expected-rate">Expected <h5>{strengths[0] + " : " + strengths[1]}</h5> </div>
            <div className="bookmake-rate-list">
              <div>
                <b>BetRate1</b>&nbsp;<input type="number" value={this.state.betRate1} onChange={e=>this.onChangeBetRate1(e)} />
              </div>
              <div>
                <b>BetRate2</b>&nbsp;<input type="number" value={this.state.betRate2} onChange={e=>this.onChangeBetRate2(e)} />
              </div>
            </div>
            <button className="decide-bet-button" onClick={()=>this.decideBetRate()} >
              Done
            </button>
            <button
                className="apply-race-close-button"
                onClick={()=>this.closeModal()}
            >
              Close
            </button>
          </div>
        </ModalComponent>
    )
  }
}

export default BookMakeModal;
