import styles from "./main-header.module.css";
import Link from "next/link";

function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Featured Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
