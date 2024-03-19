import Logo from './logo'

import styles from './header-mobile.module.css'
import { useAuth } from '../hooks/useAuth'

export default function HeaderMobile() {
  const { signOut } = useAuth()

  return (
    <header className={styles.wrapper}>
      <Logo />

      <button className={styles.button} onClick={signOut}>
        Sair
      </button>
    </header>
  )
}
