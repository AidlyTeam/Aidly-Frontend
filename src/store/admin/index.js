import { combineReducers } from "@reduxjs/toolkit";
import badgeReducer from "./badge";
import campaignReducer from "./campaign";
import nftReducer from "./nft";
const adminReducer = combineReducers({
  badge: badgeReducer,
  campaign: campaignReducer,
  nft: nftReducer,
});

export default adminReducer;
