import { useState } from 'react'
import HeaderMobile from '../components/header-mobile'
import Input from '../components/input'

import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import Button from '../components/button'
import styles from './indicate.module.css'

export default function Indicate() {
  const { token } = useAuth()

  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    api.post(
      '/movies/indicate',
      {
        title,
        year,
        gender,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  return (
    <div className={styles.wrapper}>
      <HeaderMobile />
      <h1 className={styles.title}>Indicar um filme</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Ano"
          type="text"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          placeholder="Gênero"
          type="text"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          placeholder="Descrição"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button>Enviar</Button>
      </form>
    </div>
  )
}
