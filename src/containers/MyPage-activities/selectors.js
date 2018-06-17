import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectActivity = () => createSelector(
    selectGlobal,
    substate => substate.get('activities')
);

export {
  selectActivity
}
