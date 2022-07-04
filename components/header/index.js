import Link from "next/link";
import styles from "./styles.module.css";

function Header({searchActive}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
        <h1>Etkinliğini Bul</h1>
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          {searchActive && <li>
            <a href="#">Ara</a>
          </li>
          }
          <li>
            <a href="#">Popüler Etkinlikler</a>
          </li>
          <li>
            <a href="#">Güncel Etkinlikler</a>
          </li>
          <li>
            <a href="#">Filtrele</a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header