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

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    e = e || window.event;
    const { selectedImage } = this.state;
    const { pictures, active, closeAction } = this.props;

    if (!active) {
      return;
    }

    if (e.keyCode === 27) {
      closeAction();
    } else if (e.keyCode === 37 && selectedImage > 0) {
      this.setState({
        selectedImage: selectedImage - 1,
      });
    } else if (e.keyCode === 39 && selectedImage < pictures.length - 1) {
      this.setState({
        selectedImage: selectedImage + 1,
      });
    }
  }

  handleClick(selectedImage) {
    this.setState({
      selectedImage,
    });
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
