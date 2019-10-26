import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import LinkListing from '../Components/PrimaryApp/Main/LinkListing/LinkListing'

describe.only('LinkListing', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><LinkListing /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`clicking the 'add tag' button calls the addTag function`, () => {
    const component = mount(<LinkListing router={{location: {pathname: '/'}}} />);
    const addTag = jest.spyOn(component.instance(), 'addTag');
    component.find('button').at(0).simulate('click');
    component.update();
    expect(addTag).toHaveBeenCalled();
  });
});