import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { closeIcon, infoIcon, returnIcon } from './icons';
import LazyImage from './LazyImage';
import './Album.scss';

class Album extends Component {
  state = {
    selectedImage: 0,
    selectedImageHistory: [0],
    windowWidth: 0,
  };

  constructor() {
    super();

    this.handleReturn = this.handleReturn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  handleSwipe(deltaX) {
    if (deltaX < 0) {
      this.swipingLeft();
    } else {
      this.swipingRight();
    }
  }

  swipingLeft() {
    const { selectedImage, selectedImageHistory } = this.state;

    if (selectedImage > 0) {
      selectedImageHistory.push(selectedImage - 1);

      this.setState({
        selectedImage: selectedImage - 1,
        selectedImageHistory,
      });
    }
  }

  swipingRight() {
    const { selectedImage, selectedImageHistory } = this.state;
    const { pictures } = this.props;

    if (selectedImage < pictures.length - 1) {
      selectedImageHistory.push(selectedImage + 1);

      this.setState({
        selectedImage: selectedImage + 1,
        selectedImageHistory,
      });
    }
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
    const { selectedImage, windowWidth } = this.state;

    const headingMessage =
      windowWidth < 767
        ? 'Swipe to navigate gallery'
        : 'Use arrow keys to navigate the gallery';

    return (
      <Swipeable
        onSwiped={this.handleSwipe}
        disabled={!active}
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
              <img alt="Info" src={infoIcon} /> {headingMessage}
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
      </Swipeable>
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
