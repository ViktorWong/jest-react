import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "../../index";

Enzyme.configure({ adapter: new Adapter() });

it("TodoList 初始化列表为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.state('undoList')).toEqual([])
});

it("TodoList应该给Header 传递一个添加undoList 的方法", () => {
    const wrapper = shallow(<TodoList />);
    const instance = wrapper.instance()
    const Header = wrapper.find('Header');
    expect(wrapper.instance().addUndoItem).toEqual(Header.prop('addUndoItem'))
  });

it("Header组件回车后，undoList应该新增内容，内容为输入框内容", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header')
    const addFunc = Header.prop('addUndoItem')
    addFunc('待办事项')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('待办事项')
  });
