import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectRaceInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('raceIdToRaceInfo')
);

const selectHorseInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('horseIdToHorseInfo')
);

const selectAllRaceArray = () => createSelector(
    selectGlobal,
    substate => substate.get('allRaceArray')
);

const selectCurrentPage = () => createSelector(
    selectGlobal,
    substate => substate.get('raceCurrentPage')
);

const selectAllRaceArrayLoaded = () => createSelector(
    selectGlobal,
    substate => substate.get('allRaceArrayLoaded')
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

const selectRaceCurrentDisp = () => createSelector(
    selectGlobal,
    substate => substate.get('racesCurrentDisplay')
);

const selectMyRaeArray = () => createSelector(
    selectGlobal,
    substate => substate.get('myRacesArray')
);

const selectMyHorseIdArray = () => createSelector(
    selectGlobal,
    substate => substate.get('myHorseIdArray')
);

export {
    selectRaceInfo,
    selectAllRaceArray,
    selectAllRaceArrayLoaded,
    selectBettingRaceArray,
    selectWantedRaceArray,
    selectCheckedRaceArray,
    selectHorseInfo,
    selectCurrentPage,
    selectRaceCurrentDisp,
    selectMyRaeArray,
    selectMyHorseIdArray
}
