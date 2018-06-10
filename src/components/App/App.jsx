import React, { Component } from 'react';

import { ImageList, HomeHeader } from '../';
import './App.scss';

class App extends Component {
  state = { albumsLoaded: false };
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
      albumsLoaded: true,
      undercityAlbum,
      mtshastaAlbum,
      canadaPNWAlbum,
    });
  }

  render() {
    const {
      albumsLoaded,
      undercityAlbum,
      canadaPNWAlbum,
      mtshastaAlbum,
    } = this.state;

    const pageContent = albumsLoaded ? (
      <div className="Layout">
        <div className="LayoutItem LayoutItem--fill LayoutItem--alignmentCenter">
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
                  'Another cool trip made with some cool people. Lots of maple syrup and beavers',
              },
              {
                url: mtshastaAlbum.thumbnail.src,
                title: 'Mt. Shasta ‘18',
                description:
                  "Very very big mountain that is very cold and you can't really go up there but is gorgeous",
              },
            ]}
          />
        </div>
      </div>
    ) : (
      <div className="Layout">
        <div className="LayoutItem LayoutItem--fill LayoutItem--alignmentCenter LayoutItem--distributionCenter">
          <h1>Loading albums...</h1>
        </div>
      </div>
    );

    return <main className="Page">{pageContent}</main>;
  }
}

export default App;
