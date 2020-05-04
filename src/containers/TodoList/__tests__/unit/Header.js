import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";


describe("Header 组件", () => {
  it("组件样式渲染正确", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot()
  });

  it("组件有一个输入框", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="header-input"]');
    expect(inputElem.length).toBe(1);
  });

  it("输入框初始值为空", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="header-input"]');
    expect(inputElem.prop("value")).toEqual("");
    expect(inputElem).toHaveProp("value", "");
  });

  it("输入框会跟随用户输入变化", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="header-input"]');
    const inpVal = "用户输入";
    inputElem.simulate("change", {
      target: { value: inpVal },
    });

    // 测试数据，适合单元测试
    expect(wrapper.state("value")).toEqual(inpVal);

    // 测试dom,适合有集成测试
    // const newInputElem = wrapper.find('[data-test="input"]');
    // expect(newInputElem.prop("value")).toBe(inpVal);
    // expect(newInputElem).toHaveProp("value", inpVal);
  });

  it("点击回车时候，如果输入框为空，函数不被调用", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="header-input"]');
    const inpVal = "";
    wrapper.setState({ value: inpVal });
    inputElem.simulate("keyUp", {
      keyCode: 13,
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it("点击回车时候，如果输入框为空，函数被调用，参数为输入框内值，输入框清空", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="header-input"]');
    const inpVal = "undo value";
    wrapper.setState({ value: inpVal });
    inputElem.simulate("keyUp", {
      keyCode: 13,
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(inpVal);
    expect(wrapper.state("value")).toBe("");
  });

});
