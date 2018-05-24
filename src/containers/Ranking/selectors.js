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

const selectRankGeneCurrentPage = () => createSelector(
    selectGlobal,
    (substate) => substate.get('rankGeneCurrentPage')
);

const selectRankTotalPrizeArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horsePrizeArrayLoading')
);

const selectRankTotalPrizeArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horsePrizeArray')
);

const selectRankTotalPrizeCurrentPage = () => createSelector(
    selectGlobal,
    (substate) => substate.get('rankPrizeCurrentPage')
);

const selectRankWinCountArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseWinCountArrayLoading')
);

const selectRankWinCountArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseWinCountArray')
);

const selectRankWinCountCurrentPage = () => createSelector(
    selectGlobal,
    (substate) => substate.get('rankWinCountCurrentPage')
);


export {
  selectGlobal,
  selectHorseGeneArrayLoading,
  selectHorseGeneArray,
  selectHorseIdToHorseInfo,
  selectRankGeneCurrentPage,
  selectRankTotalPrizeArrayLoading,
  selectRankTotalPrizeArray,
  selectRankTotalPrizeCurrentPage,
  selectRankWinCountArrayLoading,
  selectRankWinCountArray,
  selectRankWinCountCurrentPage
}
