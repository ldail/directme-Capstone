import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import CatListing from '../Components/PrimaryApp/Main/CatListing/CatListing'

describe('CatListing', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><CatListing /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});