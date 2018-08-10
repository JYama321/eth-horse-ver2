import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectRaceInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('raceIdToRaceInfo')
);

const selectHorseInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('horseIdToHorseInfo')
);

export {
    selectRaceInfo,
    selectHorseInfo
}