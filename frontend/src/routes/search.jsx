import { useEffect, useState } from 'react'
import { CircleEllipsis, Search as SearchIcon } from 'lucide-react'
import toast from 'react-hot-toast'

import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import Input from '../components/input'
import HeaderMobile from '../components/header-mobile'
import NotFound from '../components/not-found'

import styles from './search.module.css'
import Movie from '../components/movie'

export default function Search() {
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  function handleSearch(event) {
    event.preventDefault()
    setSearch(input)
  }

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true)
        const response = await api.get('/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
          },
        })
        console.log(response)
        setMovies(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao realizar busca')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [search, token])

  return (
    <div className={styles.wrapper}>
      <HeaderMobile />

      <form className={styles.searchForm} onSubmit={handleSearch}>
        <Input
          placeholder="Buscar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isLoading ? <CircleEllipsis /> : <SearchIcon width={20} height={20} />}
      </form>

      {!isLoading && !movies.length && <NotFound />}

      {!isLoading && !!movies.length && (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              cover={movie.cover}
              title={movie.title}
              gender={movie.gender}
              year={movie.year}
              watched={movie.watched}
            />
          ))}
        </div>
      )}
    </div>
  )
}
