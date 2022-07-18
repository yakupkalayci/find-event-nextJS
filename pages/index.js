import React from "react";
import Head from "next/head";
import Slider from "../components/slider";
import Filters from "../components/filters";
import EventCard from "../components/eventCard";
import { useEvent } from "../context/EventsContext";
import styles from "../styles/Home.module.css";
import { setDate } from "../utils";

export default function Home({ data }) {
  const {filterEvents, title} = useEvent();
  const events = filterEvents(data.items);
  const images = [];


  for(let i = 0; i < 5; i++) {
    images[i] = data.items[i];
  }

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>
          Etkinliğini Bul - Şehrindeki En Popüler Etkinlikleri Görüntüle
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.subContainer}>
        <div id="popularEvents">
          <Slider images={images} />
        </div>
        <div className={styles.titles}>
            <h3 className={styles.firstTitle}>Filtreler</h3>
            <h3 className={styles.secondTitle}>{title}</h3>
        </div>
        <div className={styles.subsubContainer}>
          <div className={styles.filters} id="filters">
            <h3 className={`${styles.mobileHeading} ${styles.mobileFilterHeading}`} id="mobileFilterTitle">Filtreler</h3>
            <Filters />
          </div>
          <div className={styles.eventCard} id="activeEvents">
            <h3 className={styles.mobileHeading}>{title}</h3>
            {
             events.length > 0 ? 
              events.map(item => {
                let date = new Date(item.start).toDateString();
                return <EventCard key={item.id} id={item.id} eventTitle={item.name} url={item.url} eventPlace={item.venue.name} eventImg={item.poster_url} eventDate={setDate(date)} />
              })
              :
              <div>Seçtiğiniz filtrelemeye göre uygun etkinlik bulunamamıştır!</div> 
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://backend.etkinlik.io/api/v2/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Etkinlik-token": process.env.NEXT_PUBLIC_ETKINLIK_TOKEN
    },
  });
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 60
  };
}
