import React from "react";
import axios from "axios";
import AddSkills from "../AddSkills/AddSkills";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import "./modal.css";
import Input from "../Input/Input";
import Layout from "../Layout/Layout";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";

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
  handleInputChange = e => {
    let formData = Object.assign({}, this.state.formData);
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
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

  handleAddSkills = skill => {
    let arg = { ...this.state.formData };
    arg.skills.push(skill);
    this.setState(
      {
        formData: arg
      },
      () => console.log(this.state.formData)
    );
  };

  handleDeleteSkills = skills => {
    let updatedSkills = { ...this.state.formData };
    updatedSkills.skills = skills;
    this.setState(
      {
        formData: updatedSkills
      },
      () => console.log(this.state.formData)
    );
  };

  onKeyPress = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  onSubmit = e => {
    e.preventDefault();
    e.target.reset();
    const id = this.props.user._id;
    const userObject = this.state.formData;
    if (this.handleFormValidation()) {
      this.props.updateUser(id, userObject);
    }
  };
  render() {
    const user = this.props.user;
    return (
      <Layout>
        <div className="profile-body">
          <div className="profile-container">
            <form id="profile-edit-form" onSubmit={this.onSubmit}>
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
                    name={user.name[0]}
                  />
                )}
                <div className="profile-name-designation">
                  <div className="edit-profile-name">{user.name}</div>
                  <div className="profile-designation">
                    <Input
                      type="text"
                      name="designation"
                      placeholder="Designation"
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
                      onKeyPress={this.onKeyPress}
                      onChange={this.handleInputChange}
                    />
                    <p className="error-msg">{this.state.errors["dob"]}</p>
                  </div>
                </div>
                <div>
                  <label className="profile-label">DEPARTMENT</label>
                  <div className="center">
                    <select
                      name="department"
                      id="sources"
                      className="custom-select"
                      onKeyPress={this.onKeyPress}
                      placeholder="Depaertment"
                      onChange={this.handleInputChange}
                    >
                      <option value="iOS">iOS</option>
                      <option value="Android">Android</option>
                      <option value="Front End">Front End</option>
                      <option value="Back End">Back End</option>
                      <option value="HR">HR</option>
                      <option value="Project manager">Project Manager</option>
                      <option value="Project owner">Project Owner</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="skills-header">SKILLS</p>
                <AddSkills
                  skills={this.state.formData.skills}
                  handleAddSkills={this.handleAddSkills}
                  handleDeleteSkills={this.handleDeleteSkills}
                />
              </div>
              <input type="submit" value="Save" className="save-btn" />
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, user) => dispatch(updateUser(id, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
