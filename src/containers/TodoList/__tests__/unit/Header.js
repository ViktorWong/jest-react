import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../../components/Header"

Enzyme.configure({ adapter: new Adapter() });

it('Header 组件有一个input输入框',() => {
    const wrapper = shallow(<Header/>)
    const inputElem = wrapper.find('[data-test="input"]')
    expect(inputElem.length).toBe(1);
})

it('Header 组件的input 初始值为空', () => {
    const wrapper = shallow(<Header/>)
    const inputElem = wrapper.find('[data-test="input"]')
    expect(inputElem.prop('value')).toEqual('')
    expect(inputElem)
})