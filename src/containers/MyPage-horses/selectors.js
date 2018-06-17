import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseArrayLoaded')
);

const selectCurrentPage = () => createSelector(
    selectGlobal,
    (substate) => substate.get('myHorsePageCurrentPage')
);

const selectHorseIdArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('myHorseIdArray')
);

const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseIdToHorseInfo')
);

export {
  selectGlobal,
  selectHorseArray,
  selectHorseIdArray,
  selectHorseIdToHorseInfo,
  selectCurrentPage
}
