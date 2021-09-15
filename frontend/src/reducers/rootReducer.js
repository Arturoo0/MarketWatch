import { combineReducers } from 'redux';
import appReducer from './appReducer';
import portfoliosReducer from './portfoliosReducer';

const rootReducer = combineReducers({
    app: appReducer,
    portfolios: portfoliosReducer,
});

export default rootReducer;
