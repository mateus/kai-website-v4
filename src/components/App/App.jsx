import React, { Component } from 'react';

import { ImageList, HomeHeader } from '../';
import './App.scss';

class App extends Component {
  render() {
    return (
      <main className="Page">
        <div className="Layout">
          <div className="LayoutItem LayoutItem--fill LayoutItem--center">
            <HomeHeader />
          </div>
          <div className="LayoutItem">
            <ImageList
              images={[
                {
                  url: 'https://placeimg.com/640/480/animals',
                  title: 'Undercity',
                },
                {
                  url: 'https://placeimg.com/640/480/tech',
                  title: 'Urban exploration',
                },
                {
                  url: 'https://placeimg.com/640/480/arch',
                  title: 'Canada & PNW ‘17',
                },
                {
                  url: 'https://placeimg.com/640/480/people',
                  title: 'Mt. Shasta ‘18',
                },
                { url: 'https://placeimg.com/640/480/nature', title: '春休み' },
                {
                  url: 'https://placeimg.com/640/480/grayscale',
                  title: 'Miscellaneous',
                },
              ]}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
