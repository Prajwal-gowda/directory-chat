import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createUser, fetchAllUsers } from "../../store/actions";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ymlLogoBackground from "../../assets/group3x.png";
import ymlSquareLogo from "../../assets/yml-square-logo.png";
import signin from "../../assets/btn_google_signin_dark.png";
import "./landing.css";

const sectionstyle = {
  backgroundImage: "url(" + ymlLogoBackground + ")",
  backgroundPosition: "left bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1266px 424px"
};
const signinStyle = {
  backgroundImage: "url(" + signin + ")",
  backgroundSize: "cover",
  backgroundColor: "inherit"
};
class LandingPage extends React.Component {
  responseGoogle = response => {
    const userData = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
      avatarUrl: response.profileObj.imageUrl
    };
    this.props.onAddUser(userData, this.props.history);
  };
  render() {
    return (
      <div style={sectionstyle} className="landing-container">
        <div>
          <div className="center-screen">
            <div className="directory-container">
              <div>
                <img
                  className="yml-square-logo"
                  src={ymlSquareLogo}
                  alt="yml-square-logo"
                />
              </div>
              <p className="YML-directory">YML DIRECTORY</p>
              <GoogleLogin
                clientId="268770202825-ilpbu759ej9ab5oo4rvub2r05au2har6.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    className="signin-btn"
                    style={signinStyle}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  ></button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (user, history) => {
      dispatch(createUser(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(withRouter(LandingPage));
