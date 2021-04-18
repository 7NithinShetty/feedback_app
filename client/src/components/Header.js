import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payment />
          </li>,
          <li key="2" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <div className={this.props.auth ? "glass" : "landingHeader"}>
        <div className="logo">
          <Link to={this.props.auth ? "/surveys/" : "/"} className="">
            <span>Feed</span> <span>Back</span>
          </Link>
        </div>
        <div className="exceptLogo">
          <ul className={this.props.auth ? "navRight" : "login"}>
            {this.renderContent()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
