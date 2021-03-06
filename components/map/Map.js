import React from 'react';
import Map, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function Mapx({location, addressTitle}) {
    const lat = Number(location.lat);
    const lng = Number(location.lng);

    const textStyle = {
        fontSize: "16px",
        fontWeight: "lighter"
    }

    return (
        <Map
        initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 14
          }}
          style={{width: "100%", height: "500px", margin:"1rem auto"}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={mapBoxToken}
          NavigationControl
        >
            <Marker longitude={lng} latitude={lat} color="red" />

            <Popup
            latitude={lat}
            longitude={lng}
            closeButton={true}
            closeOnClick={false}
            >
                <h3 style={textStyle}>{addressTitle}</h3>
            </Popup>
        </Map>
    );
}

export default Mapx;