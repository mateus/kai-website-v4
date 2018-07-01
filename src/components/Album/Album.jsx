import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { closeIcon, infoIcon, returnIcon } from './icons';
import LazyImage from './LazyImage';
import './Album.scss';

class Album extends Component {
  state = {
    selectedImage: 0,
    selectedImageHistory: [0],
  };

  constructor() {
    super();

    this.handleReturn = this.handleReturn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    e = e || window.event;
    const { selectedImage, selectedImageHistory } = this.state;
    const { pictures, active, closeAction } = this.props;

    if (!active) {
      return;
    }

    if (e.keyCode === 27) {
      closeAction();
    } else if (e.keyCode === 37 && selectedImage > 0) {
      selectedImageHistory.push(selectedImage - 1);

      this.setState({
        selectedImage: selectedImage - 1,
        selectedImageHistory,
      });
    } else if (e.keyCode === 39 && selectedImage < pictures.length - 1) {
      selectedImageHistory.push(selectedImage + 1);

      this.setState({
        selectedImage: selectedImage + 1,
        selectedImageHistory,
      });
    }
  }

  handleClick(selectedImage) {
    const { selectedImageHistory } = this.state;
    selectedImageHistory.push(selectedImage);

    this.setState({
      selectedImage,
      selectedImageHistory,
    });
  }

  handleReturn() {
    const { selectedImageHistory } = this.state;

    if (selectedImageHistory.length > 1) {
      selectedImageHistory.pop();
    }

    const previousIndex = selectedImageHistory[selectedImageHistory.length - 1];

    this.setState({
      selectedImage: previousIndex,
      selectedImageHistory,
    });
  }

  render() {
    const { pictures, active, closeAction, description } = this.props;
    const { selectedImage } = this.state;

    return (
      <div
        className={classNames('Album__Wrapper', {
          'Album__Wrapper--active': active,
        })}
        aria-hidden={!active}
      >
        <div className="Album__Hub">
          <div className="Album__Controls">
            <button onClick={this.handleReturn} className="Album_Button">
              <img alt="Return button" src={returnIcon} />
            </button>
            <p className="Album__HeadingMessage">
              <img alt="Info" src={infoIcon} /> Use arrow keys to navigate the
              gallery
            </p>
            <button onClick={closeAction} className="Album_Button">
              <img alt="Close button" src={closeIcon} />
            </button>
          </div>
          <div className="Album__Description">
            <mark>
              {pictures[selectedImage].description
                ? pictures[selectedImage].description
                : description}
            </mark>
          </div>
          <div className="Album__Pictures">
            {pictures.map((picture, index) => {
              return (
                <LazyImage
                  key={index}
                  className={classNames('Album__Picture', {
                    'Album__Picture--selected': selectedImage === index,
                  })}
                  src={picture.src}
                  onClick={this.handleClick.bind(null, index)}
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
                backgroundImage: `url(${picture.src})`,
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
