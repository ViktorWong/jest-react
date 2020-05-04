import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


// 单元测试适合用shallow,集成测试适合用mount
test('renders', () => {
   const wrapper = Enzyme.shallow(<App/>)
   expect(wrapper.find('.App').length).toBe(1)
   console.log(wrapper.debug())
   expect(wrapper.find('.App').prop('title')).toBe('hello')
});

test('renders with data-name', () => {
  const wrapper = Enzyme.shallow(<App/>)
  console.log(wrapper.find('[data-name="App"]'))
  expect(wrapper.find('[data-name="App"]')).toExist()
  expect(wrapper.find('[data-name="App"]')).toHaveProp('title','hello')
  expect(wrapper).toMatchSnapshot();
});
