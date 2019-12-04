import React from "react";

class SkillsListItem extends React.Component {
  onClickClose = () => {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  };
  render() {
    return (
      <div className="skill-card-container">
        {this.props.item}
        {this.props.removeItem ? (
          <button
            type="button"
            className="form-check-botton"
            onClick={this.onClickClose}
          >
            &times;
          </button>
        ) : null}
      </div>
    );
  }
}
export default SkillsListItem;
