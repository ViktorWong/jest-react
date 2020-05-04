import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";

describe("UndoList", () => {
  it("UndoList 组件渲染正确", () => {
      const wrapper = shallow(<UndoList />);
      expect(wrapper).toMatchSnapshot();
    });

  it("UndoList ,当数据为空数组时候，count 为0 ，列表无内容", () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = wrapper.find('[data-test="count"]');
    const listItems = wrapper.find('[data-test="list-item"]');
    expect(countElem.text()).toBe("0");
    expect(listItems.length).toBe(0);
  });

  it("UndoList的count 为数据长度 ，列表为数据内容", () => {
    const testList = ["待办1", "待办2", "待办3"];
    const wrapper = shallow(<UndoList list={testList} />);
    const countElem = wrapper.find('[data-test="count"]');
    const listItems = wrapper.find('[data-test="list-item"]');
    expect(countElem.text()).toBe("3");
    expect(listItems.length).toBe(3);
  });

  it("UndoList,当数据又内容时候，要存在删除按钮", () => {
    const testList = ["待办1", "待办2", "待办3"];
    const wrapper = shallow(<UndoList list={testList} />);
    const delElems = wrapper.find('[data-test="del-btn"]');
    expect(delElems.length).toEqual(3);
  });

  it("UndoList,当数据又内容时候，点击某个删除按钮，会调用删除方法", () => {
    const fn = jest.fn();
    const index = 1;
    const testList = ["待办1", "待办2", "待办3"];
    const wrapper = shallow(<UndoList list={testList} delBtn={fn} />);
    const delElems = wrapper.find('[data-test="del-btn"]');
    delElems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index);
  });
});
