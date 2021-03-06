import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("api/current_user")
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitSurvey = (value, history) => async dispatch => {
  const res = await axios.post("/api/surveys", value);

  dispatch({ type: FETCH_USER, payload: res.data });
  history.push("/surveys");
};
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
export const deleteSurveys = survey => async dispatch => {
  const res = await axios.patch("/api/surveys/", survey);
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
