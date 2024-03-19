import { Outlet } from 'react-router-dom'

import Sidebar from '../components/sidebar'

import styles from './root.module.css'
import MobileBar from '../components/mobile-bar'

export default function Root() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <MobileBar />
    </div>
  )
}
