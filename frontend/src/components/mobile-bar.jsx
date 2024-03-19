import { NavLink } from 'react-router-dom'
import { Bookmark, CirclePlus, Search } from 'lucide-react'

import styles from './mobile-bar.module.css'

export default function MobileBar() {
  return (
    <nav className={styles.wrapper}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.button} ${styles.active}` : styles.button
        }
      >
        <Search width={32} height={32} /> Buscar
      </NavLink>

      <NavLink
        to="/watched"
        className={({ isActive }) =>
          isActive ? `${styles.button} ${styles.active}` : styles.button
        }
      >
        <Bookmark width={32} height={32} /> Assistidos
      </NavLink>

      <NavLink
        to="/indicate"
        className={({ isActive }) =>
          isActive ? `${styles.button} ${styles.active}` : styles.button
        }
      >
        <CirclePlus width={32} height={32} /> Indicar
      </NavLink>
    </nav>
  )
}
