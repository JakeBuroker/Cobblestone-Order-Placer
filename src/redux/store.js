import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './sagas/_root.saga'; // imports ./redux/sagas/index.js

const sagaMiddleware = createSagaMiddleware();

// logger will only be added to your project in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  // tells the saga middleware to use the rootReducer
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
  
);

// tells the saga middleware to use the rootSaga
sagaMiddleware.run(rootSaga);

export default store;