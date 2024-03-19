import { useState } from 'react'
import HeaderMobile from '../components/header-mobile'
import Input from '../components/input'
import toast from 'react-hot-toast'

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

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await api.post(
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

      setTitle('')
      setYear('')
      setGender('')
      setDescription('')

      toast.success('Indicação enviada')
    } catch (error) {
      toast.error('Error ao enviar indicação')
      console.error(error)
    }
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
