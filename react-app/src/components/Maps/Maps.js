import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useHistory } from "react-router-dom";

import CustomMarker from "./pawprint.png"

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 33.62,
  lng: -117.8,
};

const Maps = ({ apiKey, dogs }) => {
    const history = useHistory();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

const goToDogPage = dogId => {
    history.push(`/dogs/${dogId}`)
}

  return (
    <>
      {isLoaded && (
            <>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={8}
                >
                    {dogs?.map(dog =>
                        <Marker
                            key={`${dog.id}_map_spot`}
                            position={{lat: dog.latitude, lng: dog.longitude}}
                            icon={{
                                url: CustomMarker,
                                labelOrigin: new window.google.maps.Point(14, -10),
                                scaledSize: new window.google.maps.Size(30, 26),
                            }}
                            label={{text: `${dog.name}`, color: "#EA4335", textShadow: "0 0 3px #000", marginBottom: "40px"}}
                            onClick={() => goToDogPage(dog.id)}
                        />

                    )}
                </GoogleMap>
            </>
      )}
    </>
  );
};

export default React.memo(Maps);
