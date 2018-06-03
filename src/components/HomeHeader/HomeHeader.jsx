import React, { Component } from 'react';

import './HomeHeader.scss';

class HomeHeader extends Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="HomeHeader__Title">
            <span
              className="HomeHeader__TitleEmoji"
              role="img"
              aria-label="Wave emoji"
            >
              👋
            </span>
            I'm Kai
          </h1>
        </header>
        <div className="HomeHeader__Content">
          <p className="HomeHeader__Quote">
            I’m a designer and photographer born in Oakland, raised in Berkeley,
            commenced in San José, and living in<br />San Francisco, California
          </p>
          <ul className="HomeHeader__SocialLinks">
            <li>
              <a
                href="https://www.instagram.com/kaigenji/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @kaigenji
              </a>
            </li>
            <li>
              <a href="mailto:kaigenji@gmail.com">email</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HomeHeader;
