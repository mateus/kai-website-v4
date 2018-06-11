import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import close from './icons/close.svg';
import LazyImage from './LazyImage';
import './Album.scss';

class Album extends Component {
  state = {
    selectedImage: 0,
  };

  handleClick(selectedImage) {
    this.setState({
      selectedImage,
    });
  }

  calculateAspectRatioFit() {
    debugger;
  }

  render() {
    const { pictures, active, closeAction } = this.props;
    const { selectedImage } = this.state;

    return (
      <div
        className={classNames('Album__Wrapper', {
          'Album__Wrapper--active': active,
        })}
      >
        <div className="Album__Hub">
          <button onClick={closeAction} className="Album_CloseButton">
            <img alt="Close button" src={close} />
          </button>
          <div className="Album__Pictures">
            {pictures.map((picture, index) => {
              return (
                <LazyImage
                  key={index}
                  className={classNames('Album__Picture', {
                    'Album__Picture--selected': selectedImage === index,
                  })}
                  src={picture.src}
                  onClick={this.handleClick.bind(this, index)}
                />
              );
            })}
            <div className="Album__PictureOffset" />
          </div>
        </div>
        {pictures.map((picture, index) => {
          return (
            <div
              key={index}
              className={classNames('Album__Preview', {
                'Album__Preview--show': selectedImage === index,
              })}
              style={{
                backgroundImage: `url(${pictures[selectedImage].src})`,
              }}
            />
          );
        })}
      </div>
    );
  }
}

Album.propTypes = {
  active: PropTypes.bool,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  closeAction: PropTypes.func,
};

export default Album;
