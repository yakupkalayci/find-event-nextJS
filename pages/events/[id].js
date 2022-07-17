import React from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import Header from "../../components/header";
import Mapx from "../../components/map/Map";
import { createMarkup, calcEventTime, calcCountdown, setDate, removeSemicolon } from "../../utils";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import styles from "../../styles/Event.module.css";

export default function Event({ data }) {
  const router = useRouter();
  const title = `Etkinliğini Bul`

  let date = new Date(data.start).toDateString();
  date = setDate(date);

  const time = calcEventTime(data.start);
  const {day, hour, minute} = calcCountdown(data);

  const location = {
    lat: data.venue.lat,
    lng: data.venue.lng,
  };

  if(router.isFallback) {
    return <div>Yükleniyor..</div>
  } else {
    return (
      <div className={styles.mainContainer}>
        <Head>
          <title>{title}</title>
        </Head>
        <Header  isHomePage={false}/>
        <div className={styles.mainContent}>
          <h2>{data.name}</h2>
          <div className={styles.eventDetails}>
            <div className={styles.firstDetails}>
              <div className={styles.eventImg}>
                <img src={data.poster_url} width="500px" height="300px" />
              </div>
              <div className={styles.eventInfos}>
                <div className={styles.datePlaceInfos}>
                  <div>
                    <p>
                      <MdDateRange />
                      <b>Tarih - Saat:</b>
                      <br /> 
                      {date} - {time}
                    </p>
                    <p>
                      <MdLocationPin />
                      <b>Konum:</b>
                      <br /> 
                      {data?.venue.name}
                    </p>
                  </div>
                  <a className={styles.actionBtn} href={data.ticket_url} target="_blank" rel="noreferrer">Bilet Al</a>
                </div>
                <div className={styles.countdown}>
                  <GiSandsOfTime className={styles.countdownIcon} />
                  <p>
                      Etkinliğin başlamasına <br/> <strong>{day} gün {hour} saat {minute} dakika</strong> <br/> kaldı.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.eventDescription} id="description">
              <h3>Açıklama</h3>
              <div dangerouslySetInnerHTML={createMarkup(data)} />;
            </div>
            <div className={styles.map}>
              <h3>Konum Bilgisi</h3>
              {
                location.lat && location.lng
                ?
                <Mapx location={location} addressTitle={data.venue.address} className={styles.mapbox}/>
                :
                <p>Konum bilgisi bulunamadı.</p>
              }
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}

export async function getStaticPaths() {
  console.log("===> getStaticProps");

  const response = await fetch("https://backend.etkinlik.io/api/v2/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Etkinlik-token": process.env.NEXT_PUBLIC_ETKINLIK_TOKEN,
    },
  });
  console.log(response.ok);

  const data = await response.json();
  const paths = await data?.items?.map(item => ({
    params: {id: String(item.id)}
  }));

  return {
    paths,
    fallback: true,
  };

}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://backend.etkinlik.io/api/v2/events/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Etkinlik-token": process.env.NEXT_PUBLIC_ETKINLIK_TOKEN,
      },
    }
  );
  const data = await response.json();

  return {
    props: { data },
  };
}
