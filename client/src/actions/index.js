import axios from "axios";
// axios is to make ajax request
import { FETCH_USER } from "./types";
import { FETCH_SURVEYS } from "./types";


// "fetchUser" is an action creator
//  The purpose of redux thunk is to inspect the return value of "action creator".
//  If the return type is a funtion instead of a normal action, then reduxthunk
//  will automatically call this function and pass in "dispatch" function 
//  as an argument.

//  We dont want immediate action.We want to dispatch the action 
//  only after the response from "axios.get("/api/current_user")"
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: 'FETCH_USER', payload: res.data});
} 

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({type: FETCH_SURVEYS, payload: res.data})
}
