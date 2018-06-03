import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { ImageList, HomeHeader } from '../';

describe('App', () => {
  it('renders correctly', () => {
    const app = shallow(<App />);

    expect(app).toMatchSnapshot();
  });

  it('renders HomeHeader', () => {
    const app = shallow(<App />);

    expect(app.find(HomeHeader)).toBeTruthy();
  });

  it('renders ImageList', () => {
    const app = shallow(<App />);

    expect(app.find(ImageList)).toBeTruthy();
  });
});
