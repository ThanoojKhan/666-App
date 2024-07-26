import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

const position = [11.372979, 76.333450];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconPng,
    iconUrl: markerIconPng,
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function Location() {
    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Our Studio Location</h2>
            <div className="relative w-full h-64">
                <MapContainer center={position} zoom={13} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Navigate to this location
                            </a>
                        </Popup>
                    </Marker>
                </MapContainer>
                <div className="flex justify-center items-center py-5">
                    <div className="cursor-pointer max-w-xs items-center justify-center flex flex-col bg-yellow-600 rounded-md p-2 text-white hover:bg-opacity-80 transition-all duration-300 ease-in-out">
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center"
                        >
                            Navigate to our studio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;
