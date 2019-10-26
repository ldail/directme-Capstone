import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import SubmitButton from '../Components/PrimaryApp/Main/SubmitButton/SubmitButton'

describe('SubmitButton', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><SubmitButton /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});