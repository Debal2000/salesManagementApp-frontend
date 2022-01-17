import { createStore } from 'redux';
import addReducers from './reducers/reducer';
const store = createStore(addReducers);
export default store;
