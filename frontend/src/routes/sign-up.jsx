import { useState } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '../hooks/useAuth'
import Logo from '../components/logo'
import Input from '../components/input'
import Button from '../components/button'
import Link from '../components/link'

import styles from './sign-up.module.css'

export default function SignUp() {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await signUp({ email, password })
    } catch (error) {
      console.error(error)
      toast.error('Error ao realizar cadastro')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Logo />
      <Input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>Cadastra-se</Button>
      <Link to="/sign-in">Entrar</Link>
    </form>
  )
}
