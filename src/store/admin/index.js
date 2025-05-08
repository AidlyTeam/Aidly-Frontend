import { combineReducers } from "@reduxjs/toolkit";
import badgeReducer from "./badge";
import campaignReducer from "./campaign";
const adminReducer = combineReducers({
  badge: badgeReducer,
  campaign: campaignReducer,
});

export default adminReducer;
