import React from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
const surveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5> please confirm your enteries</h5>
      {reviewFields}

      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => {
          submitSurvey(formValues, history);
        }}
      >
        Send
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  console.log(state);
  return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps, actions)(withRouter(surveyFormReview));
