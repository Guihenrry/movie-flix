const express = require('express')
const supabase = require('./supabase')
const { name, version } = require('../package.json')

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({
    application: name,
    version: version,
  })
})

router.post('/signin', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    })

    if (error) {
      throw new Error(error)
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    })

    if (error) {
      throw new Error(error)
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/movies', async (req, res) => {
  try {
    const accessToken = req.headers['authorization'].split('Bearer ')[1]
    const { data: userData, error: userError } = await supabase.auth.getUser(
      accessToken
    )

    if (userError) {
      throw new Error(userError.message)
    }

    const { data: userMoviesWatched } = await supabase
      .from('user_movie_watched')
      .select('*')
      .eq('user_id', userData.user.id)

    const arrayUserMoviesWatchedIds = userMoviesWatched.map(
      (item) => item.movie_id
    )

    const search = req.query.search

    if (search) {
      const { data: filteredMovies, error: filterError } = await supabase
        .from('movies')
        .select('*')
        .like('title', `%${search}%`)

      if (filterError) {
        throw new Error('Erro ao filtrar filmes.')
      }

      movies = filteredMovies
      res.json(movies)
    } else {
      const { data: movies, error: fetchError } = await supabase
        .from('movies')
        .select('*')

      if (fetchError) {
        throw new Error('Erro ao buscar filmes.')
      }

      res.json(
        movies.map((movie) => ({
          ...movie,
          watched: arrayUserMoviesWatchedIds.includes(movie.id),
        }))
      )
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/movies/:movieId/watched', async (req, res) => {
  try {
    const accessToken = req.headers['authorization'].split('Bearer ')[1]
    const { data, error } = await supabase.auth.getUser(accessToken)
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .select('*')
      .eq('id', req.params.movieId)
      .single()

    if (movieError) {
      throw new Error(movieError.message)
    }

    if (error) {
      throw new Error(error)
    }

    const { error: deleteError } = await supabase
      .from('user_movie_watched')
      .delete()
      .eq('user_id', data.user.id)
      .eq('movie_id', movie.id)

    if (deleteError) {
      throw new Error(deleteError.message)
    }

    const { error: insertError } = await supabase
      .from('user_movie_watched')
      .insert([{ user_id: data.user.id, movie_id: movie.id }])
      .select()

    if (insertError) {
      throw new Error(insertError.message)
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/movies/:movieId/unwatched', async (req, res) => {
  try {
    const accessToken = req.headers['authorization'].split('Bearer ')[1]
    const { data, error } = await supabase.auth.getUser(accessToken)
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .select('*')
      .eq('id', req.params.movieId)
      .single()

    if (movieError) {
      throw new Error(movieError.message)
    }

    if (error) {
      throw new Error(error)
    }

    const { error: deleteError } = await supabase
      .from('user_movie_watched')
      .delete()
      .eq('user_id', data.user.id)
      .eq('movie_id', movie.id)

    if (deleteError) {
      throw new Error(deleteError.message)
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/movies/indicate', async (req, res) => {
  try {
    const { title, description, gender, year } = req.body

    // Verificar se os dados necessários foram fornecidos
    if (!title || !description || !gender || !year) {
      return res.status(400).json({
        error: 'Os campos titulo, descrição, gênero e ano são obrigatórios.',
      })
    }

    // Verificar se o filme já existe na base
    const { data: movieExists } = await supabase
      .from('movies')
      .select('*')
      .eq('title', title)
      .single()
    if (movieExists) {
      return res
        .status(400)
        .json({ error: 'Esse filme já existe na nossa plataforma.' })
    }

    // Inserir filme na planilha
    const response = await fetch(
      'https://sheet.best/api/sheets/6196802f-4113-4b5c-b6f3-ce8bbd10509c',
      {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Ocorreu um erro ao cadastrar a indicação')
    }

    const json = await response.json()

    res.json(json)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
