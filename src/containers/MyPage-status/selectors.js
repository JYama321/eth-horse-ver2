import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

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
  selectHorseIdArray,
  selectHorseIdToHorseInfo,
}
