import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";

describe("TodoList 页面", () => {
  it("TodoList 初始化列表为空", () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state("undoList")).toEqual([]);
  });

  it("TodoList应该给Header 传递一个添加undoList 的方法", () => {
    const wrapper = shallow(<TodoList />);
    const instance = wrapper.instance();
    const Header = wrapper.find("Header");
    expect(typeof instance.addUndoItem).toEqual("function");
    expect(instance.addUndoItem).toEqual(Header.prop("addUndoItem"));
  });

  it("Header组件回车后，undoList应该新增内容，内容为输入框内容", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find("Header");
    const addFunc = Header.prop("addUndoItem");
    addFunc("待办事项");
    expect(wrapper.state("undoList").length).toBe(1);
    expect(wrapper.state("undoList")[0]).toEqual({
      status: "0",
      value: "待办事项",
    });
  });

  it("TodoList应该给UndoList传递一个list数组和 delBtn方法,changeStatus方法,handleBlur方法,valueChange方法", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find("UndoList");
    expect(UndoList.prop("delBtn")).toBeTruthy();
    expect(UndoList.prop("list")).toBeTruthy();
    expect(UndoList.prop("list")).toBeTruthy();
    expect(UndoList.prop("handleBlur")).toBeTruthy();
    expect(UndoList.prop("valueChange")).toBeTruthy();
  });

  it("TodoList中delBtn方法，应该删除内容", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: [
        {
          status: "0",
          value: "1",
        },
        {
          status: "0",
          value: "2",
        },
        {
          status: "0",
          value: "3",
        },
      ],
    });
    wrapper.instance().delBtn(1);
    expect(wrapper.state("undoList")).toEqual([
      {
        status: "0",
        value: "1",
      },
      {
        status: "0",
        value: "3",
      },
    ]);
  });

  it("TodoList中changeStatus方法调用时候，status应该改变", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: [
        {
          status: "1",
          value: "1",
        },
        {
          status: "0",
          value: "2",
        },
        {
          status: "0",
          value: "3",
        },
      ],
    });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state("undoList")).toEqual([
      {
        status: "0",
        value: "1",
      },
      {
        status: "1",
        value: "2",
      },
      {
        status: "0",
        value: "3",
      },
    ]);
  });

  it("handleBlur被调用时，status为0", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: [
        {
          status: "1",
          value: "1",
        },
        {
          status: "0",
          value: "2",
        },
        {
          status: "0",
          value: "3",
        },
      ],
    });
    wrapper.instance().handleBlur(0);
    expect(wrapper.state("undoList")[0]).toEqual({
      status: "0",
      value: "1",
    });
  });

  it("valueChange被调用时，value被修复", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: [
        {
          status: "1",
          value: "1",
        },
      ],
    });
    wrapper.instance().valueChange(0,'aaa');
    expect(wrapper.state("undoList")[0]).toEqual({
      status: "1",
      value: "aaa",
    });
  });
});
