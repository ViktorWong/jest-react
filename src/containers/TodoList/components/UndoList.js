import React, { Component } from "react";

export default class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list, delBtn } = this.props;
    return (
      <div className="undolist-container">
        <div data-test="count">{list.length}</div>
        <ul>
          {list.map((item, index) => {
            return (
              <li data-test="list-item" key={item + "-" + index}>
                <span>{item}</span>
                <button
                  data-test="del-btn"
                  onClick={() => {
                    delBtn(index);
                  }}
                >
                  删除
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
