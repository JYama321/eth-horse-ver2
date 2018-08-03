import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectBalance = () => createSelector(
    selectGlobal,
    substate => substate.get('balance')
);

const selectMyPageInfoLoaded = () => createSelector(
    selectGlobal,
    substate => substate.get('myPageInfoLoaded')
);

export {
    selectBalance,
    selectMyPageInfoLoaded
}
