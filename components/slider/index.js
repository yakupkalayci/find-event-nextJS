import React from "react";
import styles from "./styles.module.css";

function Slider({ images }) {
  let imageList = images;

  const handleChange = (e) => {
    let imgDOM = document.querySelector("img");
    const index = imageList.indexOf(imgDOM.src);
    if(e.target.innerText === "<") {
      if(index === 0) {
        imgDOM.src = imageList[imageList.length - 1];
      } else {
        imgDOM.src = imageList[index - 1];
      }
    } 
    else if(e.target.innerText === ">") {
      if(index === imageList.length - 1) {
        imgDOM.src = imageList[0]
      } else {
        imgDOM.src = imageList[index + 1];
      }
    }
  }
  
  return (
      <div className={styles.slider}>
        <h2>Popüler Etkinlikler</h2>
        <div className={styles.sliderContainer}>
          <div className={styles.changeBtn} onClick={(e) => handleChange(e)}>&#60;</div>
          <div className={styles.image}>
            <img src={imageList[0]} width="500px" height="300px" />
          </div>
          <div className={styles.changeBtn} onClick={(e) => handleChange(e)}>&#62;</div>
        </div>
      </div>
  );
}

export default Slider;
