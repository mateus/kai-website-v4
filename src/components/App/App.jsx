import React, { Component } from 'react';

import { ImageList, HomeHeader } from '../';
import './App.scss';

class App extends Component {
  state = {};
  mounted = true;

  componentDidMount() {
    this.loadAlbums();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async loadAlbums() {
    const undercityAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/undercity');

    if (!this.mounted) {
      return;
    }

    this.setState({
      undercityAlbum,
    });
  }

  render() {
    const { undercityAlbum } = this.state;

    if (!undercityAlbum) {
      return <h1>Loading albums</h1>;
    } else {
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
                    url: undercityAlbum.thumbnail.src,
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
                  {
                    url: 'https://placeimg.com/640/480/nature',
                    title: '春休み',
                  },
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
}

export default App;
