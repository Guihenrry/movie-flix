import { Link as LinkRouter } from 'react-router-dom'

import styles from './link.module.css'

export default function Link({ children, ...props }) {
  return (
    <LinkRouter className={styles.link} {...props}>
      {children}
    </LinkRouter>
  )
}
