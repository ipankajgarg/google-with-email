import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
class header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <img
              className="loading right"
              src={require("../images/load.gif")}
              alt="image"
            />
          </li>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            credits : {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
// function mapStateToProps(state){
//   return {auth:state.auth}
// }
//or
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(header);
