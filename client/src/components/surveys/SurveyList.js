import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurveys } from "../../actions";
class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  dateChecker(date) {
    if (date) {
      return (
        <p className="right">
          Last Respond : {new Date(date).toLocaleDateString()}
        </p>
      );
    }
    return <p className="right">No Respond</p>;
  }
  deleteSurvey(survey) {
    this.props.deleteSurveys(survey);
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card  darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>

            <img
              className="delete-icon"
              onClick={() => {
                this.deleteSurvey(survey);
              }}
              src={require("../../images/Delete-48.png")}
            />

            <p>{survey.body}</p>
            <p className="right">
              Sent On : {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes :{survey.yes}</a>
            <a>No :{survey.no}</a>
            {this.dateChecker(survey.lastResponded)}
          </div>
        </div>
      );
    });
  }
  render() {
    if (this.props.surveys.length < 1) {
      return <img className="dot-load" src={require("../../images/dot.gif")} />;
    }
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurveys })(
  SurveyList
);
