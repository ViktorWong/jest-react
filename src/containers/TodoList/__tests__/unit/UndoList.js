import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";

// it("UndoList 组件渲染正确", () => {
//     const wrapper = shallow(<UndoList />);
//     expect(wrapper).toMatchSnapshot()
//   });

it('UndoList ,当数据为空数组时候，count 为0 ，列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]}/>)
    const countElem = wrapper.find('[data-test="count"]')
    const countElem = wrapper.find('[data-test="count"]')
})