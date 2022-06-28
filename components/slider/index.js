import { React, useState } from "react";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import styles from "./styles.module.css";

function Slider({ images }) {
  let imageList = images;
  const imageUrls = imageList.map((item) => item.poster_url);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    const imgDOM = document.querySelector("img");
    setIndex(imageUrls.indexOf(imgDOM.src));

    if (e.target.innerText === "<") {
      if (index === 0) {
        imgDOM.src = imageList[imageList.length - 1].poster_url;
      } else {
        imgDOM.src = imageList[index - 1].poster_url;
      }
    } else if (e.target.innerText === ">") {
      if (index === imageList.length - 1) {
        imgDOM.src = imageList[0].poster_url;
      } else {
        imgDOM.src = imageList[index + 1].poster_url;
      }
    }

    setIndex(imageUrls.indexOf(imgDOM.src));
  };

  function createMarkup() {
    return { __html: imageList[index].content };
  }

  return (
    <div className={styles.slider}>
      <h2>Popüler Etkinlikler</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.changeBtn} onClick={(e) => handleChange(e)}>
          &#60;
        </div>
        <div className={styles.main}>
          <div className={styles.image}>
            <img src={imageList[0].poster_url} width="500px" height="300px" />
          </div>
          <div className={styles.info}>
            <h3 className={styles.eventTitle}>{imageList[index].name}</h3>
            <div className={styles.eventContent}>
              <div dangerouslySetInnerHTML={createMarkup()} />;
            </div>
            <p className={styles.eventLocation}>
              <span className={styles.span}>
                <MdLocationPin className={styles.icon} />
              </span>
              <span>{imageList[index].venue.name}</span>
            </p>
            <p className={styles.eventDate}>
              <span className={styles.span}>
                <MdDateRange className={styles.icon} />{" "}
              </span>
              <span>{new Date(imageList[index].start).toDateString()}</span>
            </p>
            <a href="#" className={styles.eventBtn}>
              İncele
            </a>
          </div>
        </div>
        <div className={styles.changeBtn} onClick={(e) => handleChange(e)}>
          &#62;
        </div>
      </div>
    </div>
  );
}

export default Slider;
