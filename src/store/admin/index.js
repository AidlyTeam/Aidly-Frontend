
import { combineReducers } from '@reduxjs/toolkit';
import badgeReducer from './badge';

const adminReducer = combineReducers({
    badge : badgeReducer,
});

export default adminReducer;
