import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectRaceCurrentDisp = () => createSelector(
    selectGlobal,
    substate => substate.get('racesCurrentDisplay')
);

const selectMyPageCurrentDisp = () => createSelector(
    selectGlobal,
    substate => substate.get('myPageCurrentDisplay')
);

export {
  selectGlobal,
  selectRaceCurrentDisp,
  selectMyPageCurrentDisp
}
