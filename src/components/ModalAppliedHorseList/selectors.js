import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectApplyRaceHorseList = createSelector(
    selectGlobal,
    substate => substate.get('applyRaceHorseCurrentPage')
);

export {
  selectApplyRaceHorseList
}
