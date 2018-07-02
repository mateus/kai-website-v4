import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { closeIcon, infoIcon, returnIcon } from './icons';
import LazyImage from './LazyImage';
import './Album.scss';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active,
      hiddenHub: false,
      selectedImage: 0,
      selectedImageHistory: [0],
      windowWidth: 0,
    };

    this.handleReturn = this.handleReturn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
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

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  handleSwipe(e, deltaX) {
    if (deltaX < 0) {
      this.swipingLeft();
    } else {
      this.swipingRight();
    }
    this.setState({
      hiddenHub: true,
    });
    return e;
  }

  handleTap() {
    this.setState({
      hiddenHub: false,
    });
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

  handleMouseMove() {
    this.setState({ hiddenHub: false });
  }

  handleKeydown(e) {
    e = e || window.event;
    const { selectedImage, selectedImageHistory, active } = this.state;
    const { pictures, closeAction } = this.props;

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
        hiddenHub: true,
      });
    } else if (e.keyCode === 39 && selectedImage < pictures.length - 1) {
      selectedImageHistory.push(selectedImage + 1);

      this.setState({
        selectedImage: selectedImage + 1,
        selectedImageHistory,
        hiddenHub: true,
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
    const { pictures, closeAction, description } = this.props;
    const { selectedImage, windowWidth, active, hiddenHub } = this.state;

    const headingMessage =
      windowWidth < 767
        ? 'Swipe to navigate gallery'
        : 'Use arrow keys to navigate the gallery';

    return (
      <Swipeable
        onSwiped={this.handleSwipe}
        onTap={this.handleTap}
        onMouseMove={this.handleMouseMove}
        disabled={!active}
        className={classNames('Album__Wrapper', {
          'Album__Wrapper--active': active,
        })}
        aria-hidden={!active}
      >
        <div className="Album__Hub">
          <div
            className={classNames('Album__Controls', {
              'Album__Controls--hidden': hiddenHub,
            })}
          >
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
          <div
            className={classNames('Album__Description', {
              'Album__Description--no-offset': hiddenHub,
            })}
          >
            <mark>
              {pictures[selectedImage].description
                ? pictures[selectedImage].description
                : description}
            </mark>
          </div>
          <div
            className={classNames('Album__Pictures', {
              'Album__Pictures--hidden': hiddenHub,
            })}
          >
            {pictures.map((picture, index) => {
              return (
                <LazyImage
                  key={index}
                  focused={selectedImage === index}
                  className={classNames('Album__Picture', {
                    'Album__Picture--selected': selectedImage === index,
                  })}
                  src={picture.src}
                  onClick={this.handleClick.bind(null, index)}
                />
              );
            })}
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
