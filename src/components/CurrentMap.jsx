import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const CurrentMap = ({latitude, longitude, google, selectedPlace}) => {
  return (
    <Map 
      google={google} 
      zoom={4} 
      initialCenter={{lat: latitude.toString(), lng: longitude.toString()}}
    >
      <Marker 
        name={'target'} 
        position={{lat: latitude.toString(), lng: longitude.toString()}}
      />
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo')
})(CurrentMap)
