import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import MainTags from '../Components/PrimaryApp/Main/MainTags/MainTags';

describe('MainTags', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MainTags /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});