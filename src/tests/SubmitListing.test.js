import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import SubmitListing from '../Components/PrimaryApp/SubmitListing/SubmitListing'

describe('SubmitListing', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><SubmitListing /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`clicking 'submit' calls the proper function`, () => {
    const component = mount(<SubmitListing router={{location: {pathname: '/'}}} />);
    const submitForm = jest.spyOn(component.instance(), 'submitForm');
    component.find('button').at(1).simulate('submit');
    component.update();
    expect(submitForm).toHaveBeenCalled();
  });

  it(`clicking the 'add tag' button calls the addTag function`, () => {
    const component = mount(<SubmitListing router={{location: {pathname: '/'}}} />);
    const addTag = jest.spyOn(component.instance(), 'addTag');
    component.find('button').at(0).simulate('click');
    component.update();
    expect(addTag).toHaveBeenCalled();
  });
});