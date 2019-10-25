import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import SearchBar from '../Components/PrimaryApp/Header/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><SearchBar /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});