import React, { Component } from "react";
import {reduxForm} from 'redux-form';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showRFormReview: false };
  renderContent(){
    if(this.state.showRFormReview){
      return <SurveyFormReview 
      onCancel ={() => this.setState({showRFormReview: false})}/>
    }
    return (
      <SurveyForm 
      onSurveySubmit={() => this.setState({ showRFormReview: true })} />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    ); 
  }
}

export default reduxForm({
  form:'surveyForm'
})(SurveyNew);
