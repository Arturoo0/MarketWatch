import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/rootReducer';

export default function configureStore() {
    const enhancers = [
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ].filter((enhancer) => !!enhancer);
    const store = createStore(
        rootReducer,
        compose(...enhancers),
    );
    return store;
}
