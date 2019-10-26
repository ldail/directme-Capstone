import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../Components/LandingPage/LandingPage';

describe('LandingPage', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LandingPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});