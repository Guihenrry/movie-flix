import { Bookmark, BookmarkCheck, Calendar, Ticket } from 'lucide-react'

import styles from './movie.module.css'

export default function Movie({
  cover,
  title,
  gender,
  year,
  watched,
  onClickMarkButton,
}) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={cover} alt={title} />
      <div>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.info}>
            <Ticket /> {gender}
          </div>
          <div className={styles.info}>
            <Calendar />
            {year}
          </div>
        </div>

        <button
          className={styles.markButton}
          aria-label="Marcar como assistido"
          onClick={onClickMarkButton}
        >
          {watched ? <BookmarkCheck /> : <Bookmark />}
        </button>
      </div>
    </div>
  )
}
