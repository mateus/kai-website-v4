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
    const mtshastaAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/mt_shasta_17');
    const canadaPNWAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/canada_pnw_18');

    if (!this.mounted) {
      return;
    }

    this.setState({
      undercityAlbum,
      mtshastaAlbum,
      canadaPNWAlbum,
    });
  }

  render() {
    const { undercityAlbum, canadaPNWAlbum, mtshastaAlbum } = this.state;

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
                    title: 'Undercity ‘13 – Today',
                    description:
                      'An anthology of trips, this series is an ongoing album documenting what many would consider to be Urban Exploration',
                  },
                  {
                    url: canadaPNWAlbum.thumbnail.src,
                    title: 'Canada & PNW ‘17',
                    description:
                      'An anthology of trips, this series is an ongoing album documenting what many would consider to be Urban Exploration',
                  },
                  {
                    url: mtshastaAlbum.thumbnail.src,
                    title: 'Mt. Shasta ‘18',
                    description:
                      'An anthology of trips, this series is an ongoing album documenting what many would consider to be Urban Exploration',
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
