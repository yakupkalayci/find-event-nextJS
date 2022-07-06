// import React from "react";
import GoogleMap from "google-map-react";

const mapStyles = {
  width: "auto",
  height: "500px",
  position:"relative",
};

const markerStyle = {
  height: "50px",
  width: "50px",
  marginTop: "-50px", 
  border:"1px solid red",
  zindex:"12"
};

const imgStyle = {
  height: "100%",
  zindex: "10"
};

const Marker = ({ title }) => {
  <div style={markerStyle}>
    <img
      style={imgStyle}
      src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png"
      alt={title}
    />
    <h3>{title}</h3>
  </div>;
};

function App({location}) {
  return (
    <div>
      <GoogleMap
        style={mapStyles}
        bootstrapURLKeys={{ key: "AIzaSyDeugGMQEu1yUPen8J-rFW_QLxDfBSrx6U" }}
        center={{ lat: Number(location?.lat), lng: Number(location?.lng) }}
        zoom={15}
      >
        <Marker
          title={"Current Location"}  
          lat={Number(location?.lat)}
          lng={Number(location?.lng)}
        ></Marker>
      </GoogleMap>
    </div>
  );
}

export default App;
