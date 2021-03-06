import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formField from "./formField";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formField, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div className="surveyMarginTop">
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  _.each(formField, ({ name }) => {
    if (!values[name]) {
      // values.name gives {name: 'sfdfsd'}
      errors[name] = `*You must provide a ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  // This below line of code will assign this whole surveyform data to STORE as
  // a surveyForm. So we can access this state by "state.form.sureveyForm"
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
