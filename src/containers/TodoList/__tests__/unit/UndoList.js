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
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "0",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList} />);
    const countElem = wrapper.find('[data-test="count"]');
    const listItems = wrapper.find('[data-test="list-item"]');
    expect(countElem.text()).toBe("3");
    expect(listItems.length).toBe(3);
  });

  it("UndoList,当数据又内容时候，要存在删除按钮", () => {
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "0",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList} />);
    const delElems = wrapper.find('[data-test="del-btn"]');
    expect(delElems.length).toEqual(3);
  });

  it("UndoList,当数据又内容时候，点击某个删除按钮，会调用删除方法", () => {
    const fn = jest.fn();
    const index = 1;
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "0",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList} delBtn={fn} />);
    const delElems = wrapper.find('[data-test="del-btn"]');
    delElems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index);
  });

  it("点击某一项时候，调用changeStatus函数", () => {
    const fn = jest.fn();
    const index = 1;
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "0",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList} changeStatus={fn} />);
    const listItems = wrapper.find('[data-test="list-item"]');
    listItems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index);
  });

  it("当某一项status为'1'时展示输入框，否则展示div", () => {
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "1",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList}/>);
    const inputItems = wrapper.find('[data-test="list-input"]');
    const spanItems = wrapper.find('[data-test="list-span"]');
    expect(inputItems.length).toBe(1);
    expect(spanItems.length).toBe(2);
  });

  it("当blur时候，handleBlur被调用", () => {
    const fn = jest.fn()
    const testList = [
      {
        status: "0",
        value: "待办1",
      },
      {
        status: "1",
        value: "待办2",
      },
      {
        status: "0",
        value: "待办3",
      },
    ];
    const wrapper = shallow(<UndoList list={testList} handleBlur={fn}/>);
    const inputItem = wrapper.find('[data-test="list-input"]');
    inputItem.simulate('blur');
    expect(fn).toHaveBeenLastCalledWith(1);
  });

  it("当某个输入框变更时，触发valueChange方法", () => {
    const fn = jest.fn()
    const testList = [
      {
        status: "1",
        value: "待办1",
      }
    ];
    const value = '学习'
    const wrapper = shallow(<UndoList list={testList} valueChange={fn}/>);
    const inputItem = wrapper.find('[data-test="list-input"]');
    inputItem.simulate('change',{
      target:{value}
    });
    expect(fn).toHaveBeenLastCalledWith(0,value);
  });
});
