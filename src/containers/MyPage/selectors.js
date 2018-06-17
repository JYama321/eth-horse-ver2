import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectMyPageCurrentDisp = () => createSelector(
    selectGlobal,
    substate => substate.get('myPageCurrentDisplay')
);

const selectBalance = () => createSelector(
    selectGlobal,
    substate => substate.get('balance')
);

export {
  selectMyPageCurrentDisp,
  selectBalance
}
