import React from "react";
import { Link } from "react-router-dom";
import AddSkills from "../AddSkills/AddSkills";
import { fetchUser } from "../../store/actions";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import DropDown from "../DropDown/DropDown";
import "./modal.css";
import Input from "../Input/Input";
import Layout from "../Layout/Layout";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";
import * as ROUTES from "../../constants/routes";

class EditProfilePage extends React.Component {
  state = {
    errors: {},
    fields: {},
    formData: {
      employeeId: "",
      designation: "",
      phoneNumber: "",
      dob: "",
      department: "",
      skills: []
    }
  };
  componentDidMount() {
    const key = this.props.user._id;
    this.props.fetchUser(key);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentUser !== this.props.currentUser &&
      Object.keys(this.props.currentUser).length > 0
    ) {
      this.setInitialState();
    }
  }
  setInitialState = () => {
    console.log(this.props.currentUser);
    const { currentUser } = this.props;
    let formDataSet = { ...this.state.formData };
    Object.keys(currentUser).forEach(key => {
      formDataSet[key] = currentUser[key];
    });
    this.setState({ formData: formDataSet });
  };
  handleInputChange = (value, name) => {
    let formData = Object.assign({}, this.state.formData);
    this.setState({
      formData: {
        ...formData,
        [name]: value
      }
    });
  };

  handleFormValidation() {
    let fields = this.state.formData;
    let errors = {};
    let formIsValid = true;

    //Designation
    if (typeof fields["designation"] !== "undefined") {
      if (!fields["designation"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["designation"] = "Enter valid Designation";
      }
    }

    //Phone Number
    if (typeof fields["phoneNumber"] !== "undefined") {
      if (
        !fields["phoneNumber"].match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
      ) {
        formIsValid = false;
        errors["phoneNumber"] = "Enter valid Phone Number.";
      }
    }
    //Employee ID
    if (typeof fields["employeeID"] !== "undefined") {
      if (!fields["employeeID"].match(/^[0-9A-Z]+$/)) {
        formIsValid = false;
        errors["employeeID"] = "Enter valid Employee ID. (ex. YML0000)";
      }
    }

    //Date
    if (typeof fields["dob"] !== "undefined") {
      if (
        !fields["dob"].match(
          /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/
        )
      ) {
        formIsValid = false;
        errors["dob"] = "Enter valid Date of Birth.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  onKeyPress = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.user._id;
    const userObject = this.state.formData;
    if (window.confirm("Are you sure you want to save the data?")) {
      // Save it!
      if (this.handleFormValidation()) {
        this.props.updateUser(id, userObject);
        this.props.history.push(ROUTES.PROFILE);
      }
    } else {
      // Do nothing!
    }
  };
  render() {
    const user = this.props.currentUser;
    return (
      <Layout>
        {user && Object.keys(user).length > 0 && (
          <div className="profile-body">
            <div className="profile-container">
              <form id="profile-edit-form">
                <div className="edit-profile-user-details">
                  {user.avatarUrl ? (
                    <img
                      className="profile-photo"
                      src={user.avatarUrl}
                      alt="user-profile"
                    />
                  ) : (
                    <UserIinitalComponent
                      className="profile-user-image"
                      name={user.name}
                    />
                  )}
                  <div className="profile-name-designation">
                    <div className="edit-profile-name">{user.name}</div>
                    <div className="profile-designation">
                      <Input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={user.designation}
                        onKeyPress={this.onKeyPress}
                        onChange={this.handleInputChange}
                      />
                      <p className="error-msg">
                        {this.state.errors["designation"]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="edit-profile-email-phone">
                  <p className="contact-info">CONTACT INFO</p>
                  <div className="profile-email">
                    <i className="fa fa-envelope-o"></i>
                    <p className="user-email">{user.emailId}</p>
                  </div>
                  <div className="profile-phone">
                    <i className="fa fa-phone"></i>
                    <div className="phone-number-input">
                      <Input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={user.phoneNumber}
                        onKeyPress={this.onKeyPress}
                        onChange={this.handleInputChange}
                      />
                      <p className="error-msg">
                        {this.state.errors["phoneNumber"]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="edit-profile-id-dob-dept">
                  <div>
                    <label className="profile-label">EMPLOYEE ID</label>
                    <div>
                      {user.employeeId ? (
                        <p className="profile-user-employeeid">
                          {user.employeeId}
                        </p>
                      ) : (
                        <Input
                          type="text"
                          name="employeeId"
                          placeholder="YML0000"
                          value={user.employeeId}
                          onKeyPress={this.onKeyPress}
                          onChange={this.handleInputChange}
                        />
                      )}
                      <p className="error-msg">
                        {this.state.errors["employeeID"]}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="profile-label">BIRTHDAY</label>
                    <div>
                      <Input
                        type="text"
                        name="dob"
                        placeholder="DD-MM-YYYY"
                        value={user.dob}
                        onKeyPress={this.onKeyPress}
                        onChange={this.handleInputChange}
                      />
                      <p className="error-msg">{this.state.errors["dob"]}</p>
                    </div>
                  </div>
                  <div>
                    <label className="profile-label">DEPARTMENT</label>
                    <div className="center">
                      <DropDown
                        name="department"
                        onKeyPress={this.onKeyPress}
                        value={user.department}
                        placeholder="Department"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="skills-header">SKILLS</p>
                  <AddSkills skills={user.skills} />
                </div>
                <div className="save-cancel">
                  <Link to={ROUTES.PROFILE}>
                    <button className="cancel-btn">Cancel</button>
                  </Link>
                  {/* <input type="submit" value="Save" className="save-btn" /> */}
                  <button onClick={this.onSubmit} className="save-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, user) => dispatch(updateUser(id, user)),
    fetchUser: id => dispatch(fetchUser(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
