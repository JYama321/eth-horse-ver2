import { createSelector } from 'reselect'

const selectGlobal = state => state.global;

const selectRaceInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('raceIdToRaceInfo')
);

const selectHorseInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('horseIdToHorseInfo')
);

const selectBettingRaceArray = () => createSelector(
    selectGlobal,
    substate => substate.get('bettingRaceArray')
);

const selectWantedRaceArray = () => createSelector(
    selectGlobal,
    substate => substate.get('wantedRaceArray')
);

const selectCheckedRaceArray = () => createSelector(
    selectGlobal,
    substate => substate.get('checkedRaceArray')
);


export {
  selectGlobal,
  selectRaceInfo,
  selectHorseInfo,
  selectBettingRaceArray,
  selectWantedRaceArray,
  selectCheckedRaceArray
}
