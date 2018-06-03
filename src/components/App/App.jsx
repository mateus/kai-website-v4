import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <main className="Page">
        <div className="Layout">
          <div className="LayoutItem LayoutItem--fill LayoutItem--center">
            <header>
              <h1 className="Title">
                <span className="TitleEmoji" role="img" aria-label="Wave emoji">
                  👋
                </span>
                I'm Kai
              </h1>
            </header>
            <div className="Content">
              <p className="Quote">
                I’m a designer and photographer born in Oakland, raised in
                Berkeley, commenced in San José, and living in<br />San
                Francisco, California
              </p>
              <ul className="SocialLinks">
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
          <div className="LayoutItem">SLIDER</div>
        </div>
      </main>
    );
  }
}

export default App;
