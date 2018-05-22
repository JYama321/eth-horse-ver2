import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isMyHorseArrayLoading')
);

const selectHorseArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseArrayLoaded')
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
  selectHorseArrayLoading,
  selectHorseArray,
  selectHorseIdArray,
  selectHorseIdToHorseInfo
}
