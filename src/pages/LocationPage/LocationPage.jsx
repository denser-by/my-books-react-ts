// import { useState } from 'react';
// import './locationpage.css';
// import './../common.css';
// import { Form, Input, Button } from 'reactstrap';
// import React from "react";
// const { compose, withProps, lifecycle } = require("compose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   DirectionsRenderer,
// } = require("react-google-maps");

// const LocationPage = compose(
//     withProps({
//       googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
//   )(props =>
//   <span className="locationShape">
//     <GoogleMap
//       defaultZoom={12}
//       defaultCenter={{ lat: 34.17223, lng: -118.37897 }}
//     >
//       <BicyclingLayer autoUpdate />
//     </GoogleMap>
//   </span>
//   );


import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 54,
  lng: 28
};

class LocationPage extends Component {
  render() {
    return (
    <span className="locationShape">
      <LoadScript
        googleMapsApiKey="AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
      </span>
    )
  }
}



// import {useRef, useEffect} from 'react';
// import '@googlemaps/js-api-loader';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { Spinner } from 'react-bootstrap';
// // import { Spinner } from 'reactstrap';

// const render = (status: Status): ReactElement => {
//   if (status === Status.FAILURE) return <ErrorComponent />;
//   return <Spinner />;
// };

// function MyMapComponent({
//   center,
//   zoom,
// }: {
//   center: google.maps.LatLngLiteral;
//   zoom: number;
// }) {
//   const ref = useRef();

//   useEffect(() => {
//     new window.google.maps.Map(ref.current, {
//       center,
//       zoom,
//     });
//   });

//   return <div ref={ref} id="map" />;
// }

// const LocationPage = () => (
//   <Wrapper apiKey={"AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"} render={render}>
//     <MyMapComponent />
//   </Wrapper>
// );

export default LocationPage;