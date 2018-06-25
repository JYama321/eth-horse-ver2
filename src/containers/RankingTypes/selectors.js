import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseGeneArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseGeneArrayLoading')
);

const selectHorseGeneArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseGeneArray')
);

const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseIdToHorseInfo')
);

const selectRankTotalPrizeArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horsePrizeArrayLoading')
);

const selectRankTotalPrizeArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horsePrizeArray')
);


const selectRankWinCountArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseWinCountArrayLoading')
);

const selectRankWinCountArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseWinCountArray')
);


export {
  selectGlobal,
  selectHorseGeneArrayLoading,
  selectHorseGeneArray,
  selectHorseIdToHorseInfo,
  selectRankTotalPrizeArrayLoading,
  selectRankTotalPrizeArray,
  selectRankWinCountArrayLoading,
  selectRankWinCountArray,
}
