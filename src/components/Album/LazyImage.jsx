import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class LazyImage extends Component {
  state = {
    loaded: false,
    error: false,
  };

  componentDidMount() {
    const { src } = this.props;
    const img = new Image();

    img.onload = () => {
      this.setState({
        loaded: true,
      });
    };
    img.onerror = () => {
      this.setState({
        error: true,
      });
    };
    img.src = src;
  }

  handleOnLoad() {
    const img = findDOMNode(this);
    const aspectRatio = calculateAspectRatioFit(img.width, img.height);

    this.setState({
      width: aspectRatio.width,
      height: aspectRatio.height,
    });
  }

  render() {
    const { error, loaded, width, height } = this.state;
    const { className, src, onClick } = this.props;

    return (
      !error &&
      loaded && (
        <img
          className={className}
          src={src}
          onLoad={this.handleOnLoad.bind(this)}
          onClick={onClick}
          width={width}
          height={height}
          alt=""
        />
      )
    );
  }
}

function calculateAspectRatioFit(
  srcWidth,
  srcHeight,
  maxWidth = 90,
  maxHeight = 90
) {
  let ratio = [maxWidth / srcWidth, maxHeight / srcHeight];
  ratio = Math.min(ratio[0], ratio[1]);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default LazyImage;
