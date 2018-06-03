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
          <div className="LayoutItem">
            <div className="Slider">
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/animals')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/nature')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/people')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/arch')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/tech')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
              <div className="SliderItem">
                <div className="SliderImageWrapper">
                  <span
                    className="SliderImage"
                    style={{
                      backgroundImage:
                        "url('https://placeimg.com/640/480/grayscale')",
                    }}
                  />
                </div>
                <p className="SliderImageTitle">Image title</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
