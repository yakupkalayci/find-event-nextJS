import styles from "./styles.module.css";
import { MdLocationPin, MdDateRange } from 'react-icons/md';


function EventCard({eventImg, eventTitle, eventDate, eventPlace, url, eventPrice}) {

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImg}>
        <img width="250px" src={eventImg} />
      </div>
      <div>
        <div className={styles.eventTitle}>
          <h4>
            <a href={url} target="_blank">{eventTitle}</a>
          </h4>
        </div>
        <div className={styles.eventDetails}>
          <div className={styles.eventTimeandPlace}>
            <p style={{marginBottom:"6px"}}>
              <span className={styles.span}><MdLocationPin /></span>
              <span>{eventPlace}</span>
            </p>
            <p>
              <span className={styles.span}><MdDateRange /></span>
              <span>{eventDate}</span>
            </p>
          </div>
        </div>
        <div className={styles.eventDetailBtn}>
          <a href="#">
            <button>İncele</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default EventCard