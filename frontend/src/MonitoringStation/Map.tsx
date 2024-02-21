import React/*, { useState }*/ from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Marker,
    MarkerProps,
} from 'react-simple-maps';
import mapJson from '../europe_.json';

interface MapProps {
    mapMarkers: MarkerProps[];
}

const Map = ({ mapMarkers } : MapProps) => {

    return (
        <div>
            <ComposableMap
                projectionConfig={{
                    scale: 400,
                    rotate: [0, 0, 0],
                    center: [10, 50],
                }}
                width={400}
                height={300}
                style={{
                    width: '50%',
                }}
            >
                <ZoomableGroup >
                    <Geographies geography={mapJson}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#ebebeb"
                                />
                            ))
                        }
                    </Geographies>
                    {mapMarkers.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates}>
                            <circle r={2} fill="#F00" stroke="#1976d2" strokeWidth={0.5}/>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default Map;