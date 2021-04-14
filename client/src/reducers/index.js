import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";


// combine Reducer will combine all the reducer
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
