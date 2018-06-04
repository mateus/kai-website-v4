import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ImageList.scss';

class ImageList extends Component {
  state = {
    hover: null,
  };

  handleMouseEnter(index) {
    this.setState({
      hover: index,
    });
  }

  handleMouseLeave(index) {
    this.setState({
      hover: null,
    });
  }

  render() {
    const { hover } = this.state;
    const { images } = this.props;

    const autoFit = images.length <= 3;
    const oneOff = (images.length - 1) % 3 === 0;

    return (
      <div>
        <div
          className={classNames('ImageList', {
            'ImageList--hovered': hover != null,
            'ImageList--autoFit': autoFit,
            'ImageList--oneOff': oneOff && !autoFit,
            'ImageList--even': images.length % 2 === 0 && !oneOff && !autoFit,
            'ImageList--odd': images.length % 2 !== 0 && !oneOff && !autoFit,
          })}
        >
          {images.map((image, index) => {
            const { url, title } = image;
            return (
              <div
                key={index}
                className="ImageList__Item"
                onMouseEnter={this.handleMouseEnter.bind(this, index)}
                onMouseLeave={this.handleMouseLeave.bind(this, index)}
              >
                <div
                  className="ImageList__Image"
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                />
                <p className="ImageList__Title">{title}</p>
              </div>
            );
          })}
        </div>
        <div
          className={classNames('ImageList__PreviewWrapper', {
            'ImageList__PreviewWrapper--hovered': hover != null,
          })}
        >
          {images.map((image, index) => {
            const { url, title, description } = image;
            return (
              <div
                key={index}
                className={classNames('ImageList__Preview', {
                  'ImageList__Preview--show': hover === index,
                })}
                style={{
                  backgroundImage: `url(${url})`,
                }}
              >
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageList;
