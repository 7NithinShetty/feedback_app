import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formField from "./formField";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formField, ({ name, label }) => {
    return (
      <div key={name} className="box">
        <label className="label">{label}</label>
        <div className="formValues">{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="surveyMarginTop">
      <div className="formReviewField">
        <h5>Please confirm your entries</h5>
        {reviewFields}
      </div>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
