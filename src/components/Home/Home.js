import React from "react";
import { fetchAllEmployees } from "../../store/actions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import "./Home.css";
import Layout from "../Layout/Layout";
import UserCard from "../UserCard/UserCard";

class HomePage extends React.Component {
  state = {
    data: [],
    offset: 0
  };
  componentWillMount() {
    this.props.fetchAllEmployees(0);
    // this.props.fetchAllUsers();
  }
  handlePageClick = data => {
    console.log(data);
    let selected = data.selected;
    console.log(selected);
    this.props.fetchAllEmployees(selected);
  };
  render() {
    const users = this.props.employees.message;
    console.log(users);
    return (
      <Layout>
        <div className="home-body">
          {users
            ? users.map((user, index) => {
                return <UserCard user={user} key={index} />;
              })
            : null}
        </div>
        <ReactPaginate
          breakLabel={"..."}
          breakClassName={"visible"}
          pageRangeDisplayed={4}
          pageCount={this.props.employees.pages}
          marginPagesDisplayed={3}
          onPageChange={this.handlePageClick}
          previousClassName={"visible"}
          nextClassName={"visible"}
          pageClassName={"list-items"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAllEmployees: pageNo => dispatch(fetchAllEmployees(pageNo))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
