import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import HeaderMobile from '../components/header-mobile'
import NoResult from '../components/no-result'

import styles from './watched.module.css'
import Movie from '../components/movie'

export default function Watched() {
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])

  function removeMovieById(id) {
    setMovies((state) => state.filter((item) => item.id !== id))
  }

  async function handleUnwatched(movie) {
    try {
      await api.post(
        `/movies/${movie.id}/unwatched`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      removeMovieById(movie.id)
      toast.success('Filme removido da lista de assistidos')
    } catch (error) {
      toast.error('Ops ocorreu um erro ao alterar o status de assistido')
    }
  }

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true)
        const response = await api.get('/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setMovies(response.data.filter((movies) => movies.watched))
      } catch (error) {
        console.error(error)
        toast.error('Erro ao realizar busca')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [token])

  return (
    <div className={styles.wrapper}>
      <HeaderMobile />

      <h1 className={styles.title}>Assitidos</h1>

      {!isLoading && !movies.length && <NoResult />}

      {!isLoading && !!movies.length && (
        <div className={styles.list}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              cover={movie.cover}
              title={movie.title}
              gender={movie.gender}
              year={movie.year}
              watched={movie.watched}
              onClickMarkButton={() => handleUnwatched(movie)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
