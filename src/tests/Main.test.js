import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Main from '../Components/PrimaryApp/Main/Main'

describe('Main', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});