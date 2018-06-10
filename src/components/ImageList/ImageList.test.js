import React from 'react';
import { shallow } from 'enzyme';

import ImageList from './ImageList';

describe('ImageList', () => {
  it('renders correctly', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);

    expect(imageList.find('.ImageList').children().length).toEqual(
      images.length
    );
  });

  it('element ImageList has hovered class when a list Item is hovered', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);
    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseenter');

    expect(
      imageList.find('.ImageList').hasClass('ImageList--hovered')
    ).toBeTruthy();
  });

  it('mouseenter on list Item updates the hover state with the its ID', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);
    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseenter');

    expect(imageList.state('hover')).toEqual(0);

    imageList
      .find('.ImageList__Item')
      .last()
      .simulate('mouseenter');

    expect(imageList.state('hover')).toEqual(1);
  });

  it('mouseleave on list Item updates the hover state to null', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);
    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseenter');

    expect(imageList.state('hover')).toEqual(0);

    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseleave');

    expect(imageList.state('hover')).toEqual(null);
  });

  it('adds autoFit class if number of items is less or equal to 3', () => {
    const images = generateImages(3);
    const imageList = shallow(<ImageList images={images} />);

    expect(
      imageList.find('.ImageList').hasClass('ImageList--autoFit')
    ).toBeTruthy();
  });

  it('adds oneOff class if number of items 4 or 7', () => {
    let images = generateImages(4);
    let imageList = shallow(<ImageList images={images} />);

    expect(
      imageList.find('.ImageList').hasClass('ImageList--oneOff')
    ).toBeTruthy();

    images = generateImages(7);
    imageList = shallow(<ImageList images={images} />);

    expect(
      imageList.find('.ImageList').hasClass('ImageList--oneOff')
    ).toBeTruthy();
  });

  it('adds even class if number of items is even', () => {
    const images = generateImages(6);
    const imageList = shallow(<ImageList images={images} />);

    expect(
      imageList.find('.ImageList').hasClass('ImageList--even')
    ).toBeTruthy();
  });

  it('adds odd class if number of items is odd', () => {
    const images = generateImages(5);
    const imageList = shallow(<ImageList images={images} />);

    expect(
      imageList.find('.ImageList').hasClass('ImageList--odd')
    ).toBeTruthy();
  });

  it('element ImageList__PreviewWrapper has hovered class when a list Item is hovered', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);
    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseenter');

    expect(
      imageList
        .find('.ImageList__PreviewWrapper')
        .hasClass('ImageList__PreviewWrapper--hovered')
    ).toBeTruthy();
  });

  it('element ImageList__Preview has show class for the hovered list Item', () => {
    const images = generateImages(2);
    const imageList = shallow(<ImageList images={images} />);
    imageList
      .find('.ImageList__Item')
      .first()
      .simulate('mouseenter');

    expect(
      imageList
        .find('.ImageList__Preview')
        .first()
        .hasClass('ImageList__Preview--show')
    ).toBeTruthy();

    imageList
      .find('.ImageList__Item')
      .last()
      .simulate('mouseenter');

    expect(
      imageList
        .find('.ImageList__Preview')
        .last()
        .hasClass('ImageList__Preview--show')
    ).toBeTruthy();
  });

  function generateImages(amount = 1) {
    const image = { url: 'url', title: 'title', description: 'description' };
    const imageArr = [];

    for (let i = 0; i < amount; i++) {
      imageArr.push(image);
    }
    return imageArr;
  }
});
