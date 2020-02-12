import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Checkbox from './Checkbox';

const mapStyles = {
  height: '75%',
  margin: '50 10 10 10',
  borderRadius: 7,
};

const headerStyle = {
  display: 'flex',
  color:'#3a886f',
  fontFamily: 'Open Sans, sans-serif',
  justifyContent: 'center',
  fontSize: 36,
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        {latitude: 43.664930, longitude: -79.376860, name: "Maitland Home", room: 1, bathrooms: 2},
        {latitude: 43.639890, longitude: -79.382880, name: "Carlton Home", room: 2, bathrooms: 3},
        {latitude: 43.660280, longitude: -79.409500, name: "Bathurst Home", room: 3, bathrooms: 1},
        {latitude: 43.659790, longitude: -79.362660, name: "Sackville Home", room: 2, bathrooms: 2},
        {latitude: 43.672990, longitude: -79.387030, name: "Church Street Home", room: 1, bathrooms: 1},
        {latitude: 43.650144, longitude: -79.410974, name: "Clairemont Home", room: 1, bathrooms: 2},
        {latitude: 43.651249, longitude: -79.367251, name: "Princess Home", room: 2, bathrooms: 1},
        {latitude: 43.674386, longitude: -79.409585, name: "Dupont Home", room: 4, bathrooms: 2},
      ],
      showingInfoWindow: false,  
      activeMarker: {},        
      selectedPlace: {},         
      checked: false,
      threeRooms: false,
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => alert(store.name)} />
    })
  }

  displayRooms = () => {
    return this.state.stores.map((store, index) => {
      if (this.state.checked && store.room >= 2) {
        return <Marker key={index} id={index} position={{
          lat: store.latitude,
          lng: store.longitude
        }}
       />
      }      
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    handleChange = (e) => {
      e.preventDefault();
      this.setState({checked: e.target.checked})
    }

  render() {
    return (
      <div>
        <h2 style={headerStyle}>Find Your Perfect Home</h2>
        <Checkbox onChange={this.handleChange} name="Rooms" label="2+ Rooms" checked={this.state.checked} />
        <Map
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{
          lat: 43.6532,
          lng: -79.3832
          }}
        >
          {
            this.state.checked  ? this.displayRooms() : this.displayMarkers()
          }
          <Marker
            onClick={this.onMarkerClick}
            name={"Jesse's Home"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNH-lncT5k3sewo7ftY4ofS0Of1XBXbMc'
})(MapContainer);
