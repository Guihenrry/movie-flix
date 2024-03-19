import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null)
  const navigate = useNavigate()

  const signIn = async ({ email, password }) => {
    const response = await api.post('/signin', {
      email,
      password,
    })
    setToken(response.data.session.access_token)
    navigate('/')
  }

  const signUp = async ({ email, password }) => {
    const response = await api.post('/signup', {
      email,
      password,
    })
    setToken(response.data.session.access_token)
    navigate('/')
  }

  const signOut = () => {
    setToken(null)
    navigate('/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
