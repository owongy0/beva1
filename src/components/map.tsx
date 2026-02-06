'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Icon } from 'leaflet';

// 21 Ashley Road, Tsim Sha Tsui coordinates
const CLINIC_LOCATION = {
  lat: 22.2971,
  lng: 114.1696,
};

// Component to open popup when map is ready
function OpenPopupOnLoad() {
  const map = useMap();
  
  useEffect(() => {
    // Small delay to ensure marker is rendered
    const timer = setTimeout(() => {
      map.eachLayer((layer: any) => {
        if (layer.getPopup && layer.getPopup()) {
          layer.openPopup();
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  
  return null;
}

export function ClinicMap() {
  const [mounted, setMounted] = useState(false);
  const [leafletIcon, setLeafletIcon] = useState<Icon | null>(null);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((L) => {
      const icon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setLeafletIcon(icon);
    });
  }, []);

  if (!mounted || !leafletIcon) {
    return (
      <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading map...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={[CLINIC_LOCATION.lat, CLINIC_LOCATION.lng]}
      zoom={16}
      scrollWheelZoom={false}
      className="w-full h-full min-h-[400px] rounded-lg isolate"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[CLINIC_LOCATION.lat, CLINIC_LOCATION.lng]} 
        icon={leafletIcon}
      >
        <Popup 
          closeButton={false} 
          autoClose={false} 
          closeOnEscapeKey={false} 
          closeOnClick={false}
        >
          <div className="text-sm">
            <strong>BEVA Clinic</strong>
            <br />
            21 Ashley Road, Tsim Sha Tsui
            <br />
            Hong Kong
          </div>
        </Popup>
      </Marker>
      <OpenPopupOnLoad />
    </MapContainer>
  );
}
