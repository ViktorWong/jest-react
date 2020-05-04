import React, { Component } from "react";

export default class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list = [], delBtn } = this.props;
    return (
      <div className="undolist-container">
        <div className="undolist-title">
          <h2>正在进行</h2>
          <div data-test="count" className="count-badge">{list.length}</div>
        </div>
        <ul className="ul-container">
          {list.map((item, index) => {
            return (
              <li data-test="list-item" key={item + "-" + index} className="li-item">
                <span>{item}</span>
                <button
                  data-test="del-btn"
                  onClick={() => {
                    delBtn(index);
                  }}
                  className="del-btn"
                >
                  -
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
