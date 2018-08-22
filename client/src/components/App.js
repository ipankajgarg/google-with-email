import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
// const Dashboard = () => <h2>dashborad</h2>;
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
