import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('horseIdToHorseInfo')
);

const selectCurrentApplyModalPage = () => createSelector(
    selectGlobal,
    substate => substate.get('applyRaceHorseCurrentPage')
);

const selectMyHorseIdArray = () => createSelector(
  selectGlobal,
  substate => substate.get('myHorseIdArray')
);

export {
  selectHorseInfo,
  selectCurrentApplyModalPage,
  selectMyHorseIdArray
}
