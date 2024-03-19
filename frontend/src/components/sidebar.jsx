import { Bookmark, CirclePlus, LogOut, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import Logo from './logo'
import styles from './sidebar.module.css'

export default function Sidebar() {
  const { signOut } = useAuth()

  return (
    <div className={styles.sidebar}>
      <Logo />

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.button} ${styles.active}` : styles.button
              }
            >
              <Search width={32} height={32} /> Buscar
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/watched"
              className={({ isActive }) =>
                isActive ? `${styles.button} ${styles.active}` : styles.button
              }
            >
              <Bookmark width={32} height={32} /> Assistidos
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/indicate"
              className={({ isActive }) =>
                isActive ? `${styles.button} ${styles.active}` : styles.button
              }
            >
              <CirclePlus width={32} height={32} /> Indicar
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className={styles.button} onClick={signOut}>
        <LogOut width={32} height={32} />
        Sair
      </button>
    </div>
  )
}
