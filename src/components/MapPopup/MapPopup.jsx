import styles from "./MapPopup.module.css";
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

// MapCameraChangedEvent,

const GOOGLE_MAPS_API_KEY=import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const locations = [
  {key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }},
  {key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 }},
  {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
  {key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 }},
  {key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 }},
  {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
  {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
  {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
  {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
  {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
  {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
  {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
  {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
  {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
  {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
];

function PoiMarkers({pois}) {
  return (
    <>
      {pois.map( (poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#FFF'} />
        </AdvancedMarker>
      ))}
    </>
  );
}

function MapPopup(props) {
  return (props.trigger) ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>&times;</button>
        <h3>{props.title}</h3>
        <br/>
        <br/>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Confirmed')}>
            <Map
              controlled={true}
                defaultZoom={13}
                zoom={13}
                defaultCenter={props.center}
                center={props.center}
                mapId='NEARBY_PRODUCERS_MAP'
                onCameraChanged={ (ev) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
                streetViewControl={false}
                rotateControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
            >
              <PoiMarkers pois={locations}/>
            </Map>
        </APIProvider>
        
        {/* <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>close</button> */}
      </div>
    </div>
  ) : "";
}

export default MapPopup;
