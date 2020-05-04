import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";


it("TodoList 初始化列表为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state('undoList')).toEqual([])
});

it("TodoList应该给Header 传递一个添加undoList 的方法", () => {
    const wrapper = shallow(<TodoList />);
    const instance = wrapper.instance()
    const Header = wrapper.find('Header');
    expect(typeof instance.addUndoItem).toEqual('function')
    expect(instance.addUndoItem).toEqual(Header.prop('addUndoItem'))
  });

it("Header组件回车后，undoList应该新增内容，内容为输入框内容", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header')
    const addFunc = Header.prop('addUndoItem')
    addFunc('待办事项')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('待办事项')
  });

  it("TodoList应该给UndoList传递一个list数组和 delBtn方法", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('delBtn')).toBeTruthy()
    expect(UndoList.prop('list')).toBeTruthy()
  });

  it("TodoList中delBtn方法，应该删除内容", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList')
    wrapper.setState({
        undoList:['1','2','3']
    })
    wrapper.instance().delBtn(1)
    expect(wrapper.state('undoList')).toEqual(['1','3'])
  });
