import React, { Component } from 'react';

import { ImageList, HomeHeader } from '../';
import './App.scss';

class App extends Component {
  state = { albumsLoaded: false, selectedAlbum: null, albums: [] };
  mounted = true;

  componentDidMount() {
    this.loadAlbums();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async loadAlbums() {
    const { albums } = this.state;
    const undercityAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/undercity');
    const mtshastaAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/mt_shasta_17');
    const canadaPNWAlbum = await import(/* webpackChunkName: 'undercityAlbum' */ './albums/canada_pnw_18');

    if (!this.mounted) {
      return;
    }

    albums.push(undercityAlbum, mtshastaAlbum, canadaPNWAlbum);

    this.setState({
      albumsLoaded: true,
      albums,
    });
  }

  handleAlbumClicked(album) {
    this.setState({ selectedAlbum: album });
    console.log('CLICKED', album);
  }

  render() {
    const { albumsLoaded, albums } = this.state;

    const pageContent = albumsLoaded ? (
      <div className="Layout">
        <div className="LayoutItem LayoutItem--fill LayoutItem--alignmentCenter">
          <HomeHeader />
        </div>
        <div className="LayoutItem">
          <ImageList
            images={generateImageListArr(albums)}
            handleClick={this.handleAlbumClicked.bind(this)}
          />
        </div>
      </div>
    ) : (
      <div className="Layout">
        <div className="LayoutItem LayoutItem--fill LayoutItem--alignmentCenter LayoutItem--distributionCenter">
          <h1 className="LoadingTitle">Loading albums...</h1>
        </div>
      </div>
    );

    return <main className="Page">{pageContent}</main>;
  }
}

function generateImageListArr(albums) {
  const imageListArr = [];

  for (const album in albums) {
    if (albums.hasOwnProperty(album)) {
      imageListArr.push({
        title: albums[album].title,
        description: albums[album].description,
        url: albums[album].thumbnail.src,
      });
    }
  }

  return imageListArr;
}

export default App;
