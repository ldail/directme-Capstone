import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import MainNav from '../Components/PrimaryApp/Main/MainNav/MainNav'

describe('MainNav', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MainNav /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});