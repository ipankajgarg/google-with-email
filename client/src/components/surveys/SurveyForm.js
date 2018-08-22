import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field
          label="Survey Title"
          type="text"
          name="title"
          component={SurveyField}
        />
        <Field
          label="Subject Line"
          type="text"
          name="subject"
          component={SurveyField}
        />
        <Field
          label="Email Body"
          type="text"
          name="body"
          component={SurveyField}
        />

        <Field
          label="Recipient List"
          type="text"
          name="recipients"
          component={SurveyField}
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="Submit" className="teal btn-flat right white-text">
            submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "plese enter a title";
  }
  if (!values.subject) {
    errors.subject = "plese enter a subject";
  }
  if (!values.body) {
    errors.body = "plese enter a body";
  }
  if (!values.recipients) {
    errors.recipients = "plese enter a emails";
  }
  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
