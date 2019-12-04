import React from "react";
import { connect } from "react-redux";
import { fetchSearchUser } from "../../store/actions";
// import SearchResult from "../SearchResults/SearchResult";
import "./headersearch.css";
import HeaderSearchResult from "../HeaderSearchResult/HeaderSearchResult";

class HeaderSearchBar extends React.Component {
  state = {
    searchString: ""
  };
  handleChange = e => {
    this.setState({ searchString: e.target.value });
    this.getSearchResult(this.state.searchString);
  };
  getSearchResult = query => {
    this.props.fetchSearchUser(query);
  };
  render() {
    return (
      <div className="header-search-bar">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <i className="fa fa-search"></i>
          <input
            className="header-searchbar-input"
            type="search"
            id="filter"
            placeholder="Search by name or skills..."
            value={this.state.searchString}
            onChange={this.handleChange}
          />
        </form>
        <div className="header-search-result">
          {this.state.searchString ? <HeaderSearchResult /> : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSearchUser: data => dispatch(fetchSearchUser(data))
  };
};
export default connect(null, mapDispatchToProps)(HeaderSearchBar);
