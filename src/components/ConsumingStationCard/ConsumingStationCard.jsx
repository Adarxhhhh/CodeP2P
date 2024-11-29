import { useState } from 'react';
import { FiEdit, FiMapPin, FiTrash2 } from 'react-icons/fi';
import styles from './ConsumingStationCard.module.css';
import MapPopup from '../MapPopup/MapPopup';

function ConsumingStationCard({stationObj}) {
    const [buttonPopup, setButtonPopup] = useState(false);
    console.log(stationObj);

    return (
        <li className={styles.consumingStation}>
            <div className={styles.title}>
                {stationObj.csName}
            </div>
            <div className={styles.consumptionRate}>
                <div className={styles.rateHeader}>Consumption Rate</div>
                <div className={styles.rateValue}>{stationObj.consumptionRate}KW/hr</div>
            </div>
            <div className={styles.cardOptions}>
                <button className={styles.mapButton} onClick={() => setButtonPopup(true)}>
                    <FiMapPin className={styles.mapIcon}/>Nearby Producers
                </button>
                <div className={styles.crudOptions}>
                    <button className={styles.editButton}>
                        <FiEdit className={styles.editIcon}/>
                    </button>
                    <button className={styles.deleteButton}>
                        <FiTrash2 className={styles.deleteIcon}/>
                    </button>
                </div>
            </div>
            <MapPopup 
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                center={stationObj.location}
                title='Nearby Producers'
            />
        </li>
    )
}

export default ConsumingStationCard