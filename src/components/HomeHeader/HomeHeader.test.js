import React from 'react';
import { shallow } from 'enzyme';

import HomeHeader from './HomeHeader';

describe('HomeHeader', () => {
  it('renders quote', () => {
    const homeHeader = shallow(<HomeHeader />);
    expect(homeHeader.find('div.HomeHeader__Quote')).toBeTruthy();
  });
});
