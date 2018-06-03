import React from 'react';
import { shallow } from 'enzyme';

import ImageList from './ImageList';

describe('ImageList', () => {
  it('renders correctly', () => {
    const images = [
      { url: 'url', title: 'title' },
      { url: 'url', title: 'title' },
    ];
    const imageList = shallow(<ImageList images={images} />);
    expect(imageList.find('div.ImageList').children().length).toEqual(
      images.length
    );
  });
});
