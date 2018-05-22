import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducer';


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history){
  const middlewares = [
      sagaMiddleware,
      routerMiddleware(history)
  ];

  const enhancers = [
      applyMiddleware(...middlewares)
  ];

  const store = createStore(
      createReducer(),
      initialState,
      compose(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {};
  store.injectedReducers = {};
  return store;
}

