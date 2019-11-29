import React, { Fragment } from "react";
import SearchResult from "../SearchResults/SearchResult";
import "./search.css";

class SearchBar extends React.Component {
  state = {
    searchString: ""
  };
  handleChange = e => {
    this.setState({ searchString: e.target.value });
  };

  handleClick = user => {
    this.props.addMemberToGroup(user);
    this.setState({ searchString: "" });
  };

  getSearchResult = () => {
    var userList = this.props.users,
      searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      userList = userList.filter(index => {
        return index.name.toLowerCase().match(searchString);
      });
    }
    if (userList.length !== this.props.users.length) {
      return userList.map((user, i) => {
        return (
          <div className="seach-result-user-card" key={i}>
            <div
              className="search-user-name"
              onClick={() => this.handleClick(user)}
            >
              {user.name}
            </div>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div className="search-input">
        <i className="fa fa-search"></i>
        <input
          className="searchbar-input"
          type="text"
          id="filter"
          placeholder="Search..."
          value={this.state.searchString}
          onChange={this.handleChange}
        />
        <div className="search-result">{this.getSearchResult()}</div>
      </div>
    );
  }
}
export default SearchBar;
