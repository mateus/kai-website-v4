import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageList.scss';

class ImageList extends Component {
  render() {
    const { images } = this.props;
    return (
      <div className="ImageList">
        {images.map((image, index) => {
          const { url, title } = image;
          return (
            <div key={index} className="ImageList__Item">
              <div className="ImageList__ImageWrapper">
                <span
                  className="ImageList__Image"
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                />
              </div>
              <p className="ImageList__Title">{title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default ImageList;
