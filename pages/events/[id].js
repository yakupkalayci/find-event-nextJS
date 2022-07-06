import { useEffect } from "react";
import Head from "next/head";
import Header from "../../components/header";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import styles from "../../styles/Event.module.css";

export default function Event({ data }) {
  useEffect(() => {
    window.location.hash = `${data.slug}`;
  }, []);

  function createMarkup() {
    return { __html: data.content };
  };

  const location = {
    // address: data.venue.address,
    lat: data.venue.lat,
    lng: data.venue.lng,
  };

  console.log(data);
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>{data.name} - Etkinliğini Bul</title>
      </Head>
      <Header />
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
                    {data.start}
                  </p>
                  <p>
                    <MdLocationPin />
                    <b>Konum:</b>
                    <br /> 
                    {data.venue.name}
                  </p>
                </div>
                <button className={styles.actionBtn}>Bilet Al</button>
              </div>
              <div className={styles.countdown}>
                <GiSandsOfTime className={styles.countdownIcon} />
                <p>
                    Etkinliğin başlamasına <br/> <strong>48 saat 41 dakika</strong> <br/> kaldı.
                </p>
                <div>
                    <button className={`${styles.faceboobBtn} ${styles.shareBtn}`}>
                        <BsFacebook />
                        </button>
                    <button className={`${styles.twitterBtn} ${styles.shareBtn}`}>
                        <BsTwitter />
                    </button>
                    <button className={`${styles.instagramBtn} ${styles.shareBtn}`}>
                        <BsInstagram />
                    </button>
                </div>
                </div>
            </div>
          </div>
          <div className={styles.eventDescription}>
            <h3>Açıklama</h3>
            <div dangerouslySetInnerHTML={createMarkup()} />;
          </div>
          <div className={styles.gMap}>
            Google Map
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://backend.etkinlik.io/api/v2/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Etkinlik-token": process.env.NEXT_PUBLIC_ETKINLIK_TOKEN,
    },
  });

  const data = await response.json();
  const paths = data.items.map((item) => ({ params: { id: String(item.id) } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params.id);
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
