import React from 'react';
import { shallow } from 'enzyme';

import HomeHeader from './HomeHeader';

describe('HomeHeader', () => {
  it('renders Title', () => {
    const homeHeader = shallow(<HomeHeader />);
    expect(homeHeader.find('.HomeHeader__Title').text()).toContain("I'm Kai");
  });

  it('renders Quote', () => {
    const homeHeader = shallow(<HomeHeader />);
    expect(homeHeader.find('.HomeHeader__Quote').text()).toEqual(
      'I’m a designer and photographer born in Oakland, raised in Berkeley, commenced in San José, and living inSan Francisco, California'
    );
  });

  it('renders Instagram link', () => {
    const homeHeader = shallow(<HomeHeader />);
    const link = homeHeader.find({
      href: 'https://www.instagram.com/kaigenji/',
    });
    expect(link).toBeTruthy();
    expect(link.text()).toEqual('@kaigenji');
  });

  it('renders Email link', () => {
    const homeHeader = shallow(<HomeHeader />);
    const link = homeHeader.find({
      href: 'mailto:kaigenji@gmail.com',
    });
    expect(link).toBeTruthy();
    expect(link.text()).toEqual('email');
  });
});
