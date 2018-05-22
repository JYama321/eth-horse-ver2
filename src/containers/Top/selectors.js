import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseArrayLoaded = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isMyHorseArrayLoaded')
);

const selectHorseArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseArrayLoaded')
);

export {
  selectGlobal,
  selectHorseArrayLoaded,
  selectHorseArray
}
