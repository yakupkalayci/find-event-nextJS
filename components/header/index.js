import Link from "next/link";
import styles from "./styles.module.css";

function Header({ isHomePage }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <h1>Etkinliğini Bul</h1>
        </Link>
      </div>
      {isHomePage ? (
        <div className={styles.links}>
          <ul>
            <li>
              <a href="#popularEvents">Popüler Etkinlikler</a>
            </li>
            <li>
              <a href="#activeEvents">Güncel Etkinlikler</a>
            </li>
            <li>
              <a href="#filters">Filtrele</a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link href="/">
            <a href="#">Anasayfaya Dön</a>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
