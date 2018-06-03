import React from 'react';
import { render } from 'enzyme';

import HomeHeader from './HomeHeader';

describe('HomeHeader', () => {
  it('renders Title', () => {
    const homeHeader = render(<HomeHeader />);
    expect(homeHeader.find('.HomeHeader__Title').text()).toContain("I'm Kai");
  });

  it('renders Quote', () => {
    const homeHeader = render(<HomeHeader />);
    expect(homeHeader.find('.HomeHeader__Quote').text()).toContain(
      'I’m a designer and photographer born in Oakland, raised in Berkeley, commenced in San José, and living inSan Francisco, California'
    );
  });

  it('renders Instagram link', () => {
    const homeHeader = render(<HomeHeader />);
    const link = homeHeader.find('.HomeHeader__SocialLinks a', {
      href: 'https://www.instagram.com/kaigenji/',
    });
    expect(link).toBeTruthy();
    expect(link.text()).toContain('@kaigenji');
  });

  it('renders Email link', () => {
    const homeHeader = render(<HomeHeader />);
    const link = homeHeader.find('.HomeHeader__SocialLinks a', {
      href: 'mailto:kaigenji@gmail.com',
    });
    expect(link).toBeTruthy();
    expect(link.text()).toContain('email');
  });
});
