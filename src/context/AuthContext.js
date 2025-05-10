import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import authConfig from '@/configs/auth'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '@/store/user/userSlice'

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean,
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  initAuth: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  const dispatch = useDispatch()

  const router = useRouter()

  const deleteStorage = () => {
    localStorage.removeItem(authConfig.userDataName)
    setUser(null)
    setLoading(false)
    setIsInitialized(false)
    router.replace('/login')
  }

  const handleLogout = () => {
    deleteStorage()
  }

  const handleRegister = async ({ publicKey, message, signedMessage }) => {
    const user = {
      publicKey,
      message,
      signedMessage,
      role: 'user'
    }

    localStorage.setItem(authConfig.userDataName, JSON.stringify(user))
    setUser(user)
    router.push('/')
  }

  const initAuth = async () => {
    setIsInitialized(true)
    setLoading(true)

    try {
      const storedUser = localStorage.getItem(authConfig.userDataName)

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        
        // Get user info from API
        const response = await dispatch(getUserInfo()).unwrap()
        
        if (response) {
          // Update user data with API response
          const updatedUser = {
            ...parsedUser,
            ...response.data
          }
          localStorage.setItem(authConfig.userDataName, JSON.stringify(updatedUser))
          setUser(updatedUser)
        } else {
          // If API call fails, log out the user
          deleteStorage()
        }
      } else {
        // No stored user, redirect to login
        router.replace('/login')
      }
    } catch (err) {
      console.error('Auth init error:', err)
      deleteStorage()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    logout: handleLogout,
    register: handleRegister,
    initAuth,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
