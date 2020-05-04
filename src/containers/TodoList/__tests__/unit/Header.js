import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../../components/Header";

Enzyme.configure({ adapter: new Adapter() });

it("Header 组件有一个input输入框", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find('[data-test="input"]');
  expect(inputElem.length).toBe(1);
});

it("Header 组件的input 初始值为空", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find('[data-test="input"]');
  expect(inputElem.prop("value")).toEqual("");
  expect(inputElem).toHaveProp("value", "");
});

it("Header 组件的input change 时候，会跟随用户的输入变化", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find('[data-test="input"]');
  const inpVal = "用户输入";
  inputElem.simulate("change", {
    target: { value: inpVal },
  });

  // 测试数据，适合单元测试
  expect(wrapper.state("value")).toEqual(inpVal);

  // 测试dom,适合有集成测试
  const newInputElem = wrapper.find('[data-test="input"]');
  expect(newInputElem.prop("value")).toBe(inpVal);
  expect(newInputElem).toHaveProp("value", inpVal);
});

it("Header 组件input 框点击回车时候，如果input 为空，函数不被调用", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find('[data-test="input"]');
  const inpVal = "";
  wrapper.setState({ value: inpVal });
  inputElem.simulate("keyUp", {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalled();
});

it("Header 组件input 框点击回车时候，如果input有值，函数被调用，调用参数为input值", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn} />);
  const inputElem = wrapper.find('[data-test="input"]');
  const inpVal = "undo value";
  wrapper.setState({ value: inpVal });
  inputElem.simulate("keyUp", {
    keyCode: 13,
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith(inpVal);
});

it("Header 组件input 框点击回车后，input值为空", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="input"]');
    const inpVal = "undo value";
    wrapper.setState({ value: inpVal });
    inputElem.simulate("keyUp", {
      keyCode: 13,
    });
    expect(wrapper.state('value')).toBe('')
  });
