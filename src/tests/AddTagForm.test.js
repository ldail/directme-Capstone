import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import AddTagForm from '../Components/PrimaryApp/Main/AddTagForm/AddTagForm'

describe('AddTagForm', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddTagForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`clicking the 'add tag' button calls the validateText function`, () => {
    const component = mount(<BrowserRouter><AddTagForm id={{}} router={{location: {pathname: '/'}}} /></BrowserRouter>).find(AddTagForm);
    const validateText = jest.spyOn(component.instance(), 'validateText');
    component.find('button').at(0).simulate('submit');
    component.update();
    expect(validateText).toHaveBeenCalled();
  });
});