import React from "react";
import styles from "./styles.module.css";

function Slider({ images }) {
  return (
      <div className={styles.slider}>
        <h2>Popüler Etkinlikler</h2>
        <div className={styles.sliderContainer}>
          <div className={styles.changeBtn}>+</div>
          <div className={styles.image}>IMG</div>
          <div className={styles.changeBtn}>+</div>
        </div>
      </div>
  );
}

export default Slider;
