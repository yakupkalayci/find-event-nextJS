import {React, useEffect, useState} from 'react'
import { useEvent } from '../../context/EventsContext';
import styles from "./styles.module.css";

function Filters() {
  const [kindsList, setKindsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const {handleSelect, handleClick} = useEvent();

  useEffect(() => {
    async function fetchKindData() {
      const data = await fetch("https://backend.etkinlik.io/api/v2/formats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Etkinlik-token": "92510ee702346c171e6e27c6566af993",
        }
      });
      const kinds = await data.json();
      setKindsList(kinds);
    }
    async function fetchCategoryData() {
      const data = await fetch("https://backend.etkinlik.io/api/v2/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Etkinlik-token": "92510ee702346c171e6e27c6566af993",
        }
      });
      const categories = await data.json();
      setCategoryList(categories);
    }
    async function fetchCityData() {
      const data = await fetch("https://backend.etkinlik.io/api/v2/cities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Etkinlik-token": "92510ee702346c171e6e27c6566af993",
        }
      });
      const cities = await data.json();
      setCityList(cities);
    }
    fetchKindData();
    fetchCategoryData();
    fetchCityData();
  }, [])


  return (
    <div className={styles.filtersContainer}>
      <div className={styles.categoryFilter}>
        <label htmlFor='kinds'>Türe Göre:</label> <br />
          <select id='kinds' name='kinds' onChange={(e) => handleSelect(e)}>
            {
              kindsList.map(item => <option key={item.id} value={item.slug}>{item.name}</option>)
            }
          </select>
      </div>
      <div className={styles.categoryFilter}>
        <label htmlFor='categories'>Kategoriye Göre:</label> <br />
          <select id='categories' name='categories' onChange={(e) => handleSelect(e)}>
            {
              categoryList.map(item => <option key={item.id} value={item.slug}>{item.name}</option>)
            }
          </select>
      </div>
      <div className={styles.categoryFilter}>
        <label htmlFor='cities'>Şehre Göre:</label> <br />
          <select id='cities' name='cities' onChange={(e) => handleSelect(e)}>
            {
              cityList.map(item => <option key={item.id} value={item.slug}>{item.name}</option>)
            }
          </select>
      </div>
      <div className={styles.categoryFilter}>
        <button onClick={() => handleClick()}>Sıfırla</button>
      </div>
    </div>
  )
}

export default Filters