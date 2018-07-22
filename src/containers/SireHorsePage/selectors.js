import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isMyHorseArrayLoadDone')
);

const selectHorseArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseArrayLoaded')
);

const selectCurrentSireHorseId = () => createSelector(
    selectGlobal,
    (substate) => substate.get('currentSireHorseId')
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

const selectCurrentSirePage = () => createSelector(
    selectGlobal,
    substate => substate.get('sireHosePage')
);

const selectMatePrice = () => createSelector(
    selectGlobal,
    substate => substate.get('matePrice')
);

export {
    selectGlobal,
    selectHorseArrayLoading,
    selectHorseArray,
    selectHorseIdArray,
    selectHorseIdToHorseInfo,
    selectCurrentPage,
    selectCurrentSireHorseId,
    selectCurrentSirePage,
    selectMatePrice
}
