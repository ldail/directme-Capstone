import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import SubmitListing from '../Components/PrimaryApp/SubmitListing/SubmitListing';

describe('SubmitListing', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubmitListing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


});