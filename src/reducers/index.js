import { combineReducers } from "redux";
import { userReducer } from './userReducer.js'
import { searchReducer } from "./searchreducer.js";

import { registerReducer } from "./registeration.js";

 const rootReducer = combineReducers({
     user: userReducer,
      search: searchReducer,
     registeration: registerReducer
})
export default rootReducer