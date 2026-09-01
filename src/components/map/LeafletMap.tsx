'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Supercluster from 'supercluster';
import { Startup } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';
import { Flame } from 'lucide-react';
import { getCompanyLogoUrl } from '@/utils/logo';
import { INITIAL_JOBS } from '@/data/jobs';

interface LeafletMapProps {
  startups: Startup[];
  selectedStartup: Startup | null;
  onSelectStartup: (startup: Startup) => void;
  onCompareStartup?: (startup: Startup) => void;
  activeArea?: string;
  onAreaChange?: (areaName: string) => void;
}

export default function LeafletMap({
  startups,
  selectedStartup,
  onSelectStartup,
  onCompareStartup,
  activeArea,
  onAreaChange,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<import('leaflet').Map | null>(null);
  const markersLayerGroupRef = useRef<import('leaflet').LayerGroup | null>(null);
  const markersMapRef = useRef<{ [id: string]: import('leaflet').Marker }>({});
  const initializedRef = useRef<boolean>(false);

  const [mapStyle, setMapStyle] = useState<'light' | 'dark' | 'satellite'>('light');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);

  // Exact totals from the provided Hyderabad openings workbook.
  const totalOpeningsCount = 984;
  const hiringCompanyCount = 99;

  // Industry color mapping for circular pin rings & badges
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'SaaS & Enterprise':
        return '#2563EB'; // Blue
      case 'AI & Machine Learning':
        return '#7C3AED'; // Purple
      case 'FinTech & InsurTech':
      case 'FinTech':
        return '#059669'; // Emerald
      case 'HealthTech & BioTech':
      case 'HealthTech':
        return '#E11D48'; // Rose
      case 'DeepTech & Aerospace':
      case 'DeepTech & AI':
      case 'Space Tech':
        return '#D97706'; // Amber
      case 'CleanTech & EV':
      case 'CleanTech & Energy':
        return '#0891B2'; // Cyan
      case 'E-Commerce & Consumer':
        return '#EA580C'; // Orange
      default:
        return '#4F46E5'; // Indigo
    }
  };

  // Helper to get tile configuration using authenticated CARTO basemaps
  const getTileConfig = (style: 'light' | 'dark' | 'satellite') => {
    const CARTO_KEY = 'cb1_2c85_1_890e19bc626c26223bd8f571';
    switch (style) {
      case 'light':
        return {
          url: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_KEY}`,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        };
      case 'dark':
        return {
          url: `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${CARTO_KEY}`,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        };
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar, Earthstar Geographics',
          subdomains: 'abc',
          maxZoom: 19,
        };
    }
  };

  // Inject Leaflet CSS
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!document.getElementById('leaflet-css-cdn')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  // Prepare Supercluster instance with startup GeoJSON points
  const supercluster = useMemo(() => {
    const sc = new Supercluster({
      radius: 45,
      maxZoom: 15,
      minPoints: 2,
    });

    const points = startups.map((startup) => ({
      type: 'Feature' as const,
      properties: {
        cluster: false,
        startupId: startup.id,
        startup: startup,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [startup.location.lng, startup.location.lat],
      },
    }));

    sc.load(points);
    return sc;
  }, [startups]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    import('leaflet').then((L) => {
      if (!mapRef.current || leafletMapInstance.current) return;

      const initialLat = 17.4435;
      const initialLng = 78.3772;

      const map = L.map(mapRef.current, {
        center: [initialLat, initialLng],
        zoom: 12,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const { url, attribution, subdomains, maxZoom } = getTileConfig('light');
      L.tileLayer(url, { maxZoom, attribution, subdomains }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      markersLayerGroupRef.current = layerGroup;

      leafletMapInstance.current = map;
      setMapReady(true);
    });

    return () => {
      initializedRef.current = false;
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
        markersLayerGroupRef.current = null;
      }
    };
  }, []);

  // Update Map Tile Layer when style changes
  useEffect(() => {
    if (!leafletMapInstance.current) return;
    import('leaflet').then((L) => {
      const map = leafletMapInstance.current;
      if (!map) return;
      map.eachLayer((layer: import('leaflet').Layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      const { url, attribution, subdomains, maxZoom } = getTileConfig(mapStyle);
      L.tileLayer(url, { maxZoom, attribution, subdomains }).addTo(map);
    });
  }, [mapStyle]);

  // Register global logo-fallback map so inline onerror handlers can look up
  // clean fallback URLs without embedding SVG data URIs in HTML attribute strings.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Populate the global lookup table keyed by startup id
    type WinExt = typeof window & {
      __logoFallback?: Record<string, { logodev: string; google: string; final: string }>;
      __logoError?: (img: HTMLImageElement) => void;
    };
    const w = window as WinExt;
    if (!w.__logoFallback) w.__logoFallback = {};
    startups.forEach((s) => {
      const domain = s.website?.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
      const logoDev = domain ? `https://img.logo.dev/${domain}?token=pk_Nk1GfpWcRUi2-1EQZzhuwA&size=256&format=png` : null;
      const googleFav = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=256` : null;
      const finalUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=1e293b&color=38bdf8&bold=true&size=128`;
      w.__logoFallback![s.id] = { 
        logodev: logoDev || finalUrl,
        google: googleFav || finalUrl, 
        final: finalUrl 
      };
    });
    // Global handler called from inline onerror on map pins
    // Priority: UI-Avatars (current) -> Logo.dev -> Google S2 -> Final (UI-Avatars)
    w.__logoError = function (img: HTMLImageElement) {
      const id = img.dataset.sid || '';
      const fb = w.__logoFallback?.[id];
      if (!fb) { img.onerror = null; return; }
      const src = img.src || '';
      
      // Currently on UI-Avatars and it failed? Try Logo.dev
      if (src.includes('ui-avatars.com')) {
        img.onerror = function () { 
          // Logo.dev failed, try Google S2
          img.onerror = function () {
            // Google failed too, use final (UI-Avatars is our primary, so shouldn't get here)
            img.onerror = null;
            img.src = fb.final;
          };
          img.src = fb.google;
        };
        img.src = fb.logodev;
        return;
      }
      
      // Currently on Logo.dev and it failed? Try Google S2
      if (src.includes('img.logo.dev')) {
        img.onerror = function () {
          img.onerror = null;
          img.src = fb.final;
        };
        img.src = fb.google;
        return;
      }
      
      // Currently on Google S2 and it failed? Use final fallback
      if (src.includes('s2/favicons')) {
        img.onerror = null;
        img.src = fb.final;
        return;
      }
      
      // Shouldn't get here, but just in case
      img.onerror = null;
    };
  }, [startups]);

  // Update Clusters & Markers on Map View Change
  useEffect(() => {
    if (!leafletMapInstance.current || !mapReady || !markersLayerGroupRef.current) return;

    const map = leafletMapInstance.current;
    const layerGroup = markersLayerGroupRef.current;

    const renderMarkers = () => {
      import('leaflet').then((L) => {
        layerGroup.clearLayers();
        markersMapRef.current = {};

        const bounds = map.getBounds();
        const zoom = Math.floor(map.getZoom());
        const bbox: [number, number, number, number] = [
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ];

        const clusters = supercluster.getClusters(bbox, zoom);

        clusters.forEach((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const isCluster = cluster.properties.cluster;

          if (isCluster) {
            const pointCount = cluster.properties.point_count;
            // Palette based on cluster density
            let bgColor = '#10B981'; // Emerald for small
            if (pointCount >= 10) bgColor = '#F59E0B'; // Amber for medium
            if (pointCount >= 20) bgColor = '#EF4444'; // Red for large

            const clusterIcon = L.divIcon({
              html: `
                <div style="
                  width: 38px; height: 38px; border-radius: 50%;
                  background: ${bgColor}; color: #ffffff;
                  border: 2.5px solid #ffffff;
                  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
                  display: flex; align-items: center; justify-content: center;
                  font-weight: 800; font-size: 13px;
                  font-family: system-ui, -apple-system, sans-serif;
                  cursor: pointer;
                ">
                  ${pointCount}
                </div>
              `,
              className: 'custom-cluster-badge',
              iconSize: [38, 38],
              iconAnchor: [19, 19],
            });

            const clusterMarker = L.marker([lat, lng], { icon: clusterIcon });
            clusterMarker.on('click', () => {
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(cluster.id as number),
                18
              );
              map.flyTo([lat, lng], expansionZoom, { duration: 0.8 });
            });

            layerGroup.addLayer(clusterMarker);
          } else {
            const startup: Startup = cluster.properties.startup;
            const color = getIndustryColor(startup.industry);
            const logoUrl = getCompanyLogoUrl(startup.website, startup.name, startup.logoUrl);
            const safeName = startup.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            // Use global __logoError to avoid embedding SVG data URIs in HTML strings
            const onerror = `if(window.__logoError)window.__logoError(this);`;

            const matchingJobs = (startup.jobOpenings && startup.jobOpenings.length > 0)
              ? startup.jobOpenings
              : INITIAL_JOBS.filter(j => j.startupId === startup.id || j.startupName.toLowerCase() === startup.name.toLowerCase());
            const openRolesCount = matchingJobs.length;

            const iconHtml = `
              <div style="position:relative;display:inline-block;cursor:pointer;">
                <div style="
                  width:40px;height:40px;border-radius:12px;
                  background:#ffffff;border:2.5px solid ${color};
                  box-shadow:0 4px 12px rgba(0,0,0,0.25);
                  display:flex;align-items:center;justify-content:center;
                  overflow:hidden;padding:3px;
                ">
                   <img
                    src="${logoUrl}"
                    alt="${safeName}"
                    data-sid="${startup.id}"
                    width="32" height="32"
                    style="width:100%;height:100%;object-fit:contain;border-radius:8px;"
                    onerror="${onerror}"
                  />
                </div>
                ${openRolesCount > 0 ? `
                  <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);min-width:22px;height:22px;padding:0 6px;background:#ef4444;color:#fff;border:2px solid #fff;border-radius:999px;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(239,68,68,0.35);z-index:10;line-height:1;">
                    ${openRolesCount}
                  </span>
                ` : ''}
              </div>
            `;

            const customIcon = L.divIcon({
              html: iconHtml,
              className: 'startup-pin-badge',
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            });

            const marker = L.marker([lat, lng], { icon: customIcon });

            const popupHtml = `
              <div style="padding:14px;max-width:240px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1e293b;background:#fff;border-radius:18px;box-shadow:0 12px 28px rgba(0,0,0,0.18);">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <div style="width:38px;height:38px;border-radius:10px;background:#fff;border:1.5px solid #e2e8f0;overflow:hidden;padding:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
                    <img src="${logoUrl}" data-sid="${startup.id}" width="32" height="32" style="width:100%;height:100%;object-fit:contain;border-radius:6px;" onerror="${onerror}" />
                  </div>
                  <div style="overflow:hidden;">
                    <h4 style="font-weight:800;font-size:14px;color:#0f172a;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${startup.name}</h4>
                    <span style="font-size:9px;padding:2px 7px;border-radius:9999px;color:#fff;font-weight:700;background:${color};">${startup.industry}</span>
                  </div>
                </div>
                ${openRolesCount > 0 ? `
                  <div style="background:#fee2e2;color:#b91c1c;border:1px solid #fecaca;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;margin-bottom:6px;display:inline-block;">
                    ${openRolesCount} open roles
                  </div>
                ` : ''}
                <p style="font-size:11px;color:#64748b;margin:0 0 8px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${startup.tagline}</p>
                <div style="display:flex;align-items:center;justify-space-between;font-size:10px;color:#64748b;border-top:1px solid #f1f5f9;padding-top:8px;font-weight:600;">
                  <span>📍 ${startup.location.area}</span>
                  <span style="color:#F97316;font-weight:700;cursor:pointer;">View details →</span>
                </div>
              </div>
            `;

            marker.bindPopup(popupHtml, { closeButton: false, offset: [0, -10] });
            marker.on('click', () => onSelectStartup(startup));

            layerGroup.addLayer(marker);
            markersMapRef.current[startup.id] = marker;
          }
        });
      });
    };

    renderMarkers();

    map.on('moveend', renderMarkers);
    map.on('zoomend', renderMarkers);

    return () => {
      map.off('moveend', renderMarkers);
      map.off('zoomend', renderMarkers);
    };
  }, [supercluster, mapReady, onSelectStartup]);

  // Selected startup flyTo
  useEffect(() => {
    if (!leafletMapInstance.current || !selectedStartup) return;
    const map = leafletMapInstance.current;
    map.flyTo([selectedStartup.location.lat, selectedStartup.location.lng], 15, {
      duration: 1.2,
    });

    const marker = markersMapRef.current[selectedStartup.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedStartup]);

  // Active area flyTo
  useEffect(() => {
    if (!leafletMapInstance.current || !activeArea || activeArea === 'All') return;
    const areaInfo = HYDERABAD_AREAS.find((a) => a.name === activeArea);
    if (areaInfo) {
      leafletMapInstance.current.flyTo([areaInfo.lat, areaInfo.lng], areaInfo.zoom, {
        duration: 1.5,
      });
    }
  }, [activeArea]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100">
      {/* Leaflet Map DOM Element */}
      <div ref={mapRef} className="w-full h-full z-0" />



      {/* Floating Bottom Right Map Controls */}
      <div className="absolute bottom-12 sm:bottom-4 right-3 sm:right-14 z-10 flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md p-1 rounded-full shadow-lg border border-gray-200 text-xs max-w-[calc(100vw-2rem)] overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMapStyle('light')}
          aria-label="Light map style"
          className={`px-2.5 sm:px-3 py-1 rounded-full font-semibold transition-all ${
            mapStyle === 'light' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          suppressHydrationWarning
        >
          Light
        </button>
        <button
          onClick={() => setMapStyle('dark')}
          aria-label="Dark map style"
          className={`px-2.5 sm:px-3 py-1 rounded-full font-semibold transition-all ${
            mapStyle === 'dark' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          suppressHydrationWarning
        >
          Dark
        </button>
        <button
          onClick={() => setMapStyle('satellite')}
          aria-label="Satellite map style"
          className={`px-2.5 sm:px-3 py-1 rounded-full font-semibold transition-all ${
            mapStyle === 'satellite' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          suppressHydrationWarning
        >
          Sat
        </button>
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          aria-label="Toggle Heatmap"
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full font-semibold border transition-all ${
            showHeatmap
              ? 'bg-amber-100 border-amber-300 text-amber-700'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
          suppressHydrationWarning
        >
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Heatmap</span>
        </button>
      </div>

      {/* Heatmap Layer */}
      {showHeatmap && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-radial from-orange-400/20 via-rose-400/10 to-transparent animate-pulse" />
      )}
    </div>
  );
}
