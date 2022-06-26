import styles from "./styles.module.css";

function EventCard({eventImg, eventTitle, eventDate, eventPlace, url, eventPrice}) {

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImg}>
        <img width="250px" src={eventImg} />
      </div>
      <div>
        <div className={styles.eventTitle}>
          <h3>
            <a href={url} target="_blank">{eventTitle}</a>
          </h3>
        </div>
        <div className={styles.eventDetails}>
          <div className={styles.eventTimeandPlace}>
            <p style={{marginBottom:"6px"}}>{eventPlace}</p>
            <p>{eventDate}</p>
          </div>
          {
            eventPrice && <p>Ücretsiz</p>
          }
        </div>
        <div className={styles.eventDetailBtn}>
          <button>İncele</button>
        </div>
      </div>
    </div>
  )
}

export default EventCard