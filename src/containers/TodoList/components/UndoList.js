import React, { Component } from "react";

export default class UndoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      list = [],
      delBtn,
      changeStatus,
      handleBlur,
      valueChange,
    } = this.props;
    return (
      <div className="undolist-container">
        <div className="undolist-title">
          <h2>正在进行</h2>
          <div data-test="count" className="count-badge">
            {list.length}
          </div>
        </div>
        <ul className="ul-container">
          {list.map((item, index) => {
            return (
              <li
                data-test="list-item"
                key={item + "-" + index}
                className="li-item"
                onClick={() => changeStatus(index)}
              >
                {item.status === "0" ? (
                  <span data-test="list-span">{item.value}</span>
                ) : (
                  <input
                    autoFocus
                    className="list-input"
                    type="text"
                    data-test="list-input"
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    onChange={(e) => valueChange(index, e.target.value)}
                  />
                )}
                <button
                  data-test="del-btn"
                  onClick={(e) => {
                    e && e.stopPropagation();
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
