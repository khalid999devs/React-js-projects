import { createContext, useContext, useEffect, useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import app from '../firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  //signup function
  const signUp = async (email, password, username) => {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)

    //update profile
    await updateProfile(auth.currentUser, { displayName: username })

    const user = auth.currentUser
    setCurrentUser({
      ...user,
    })
  }

  //login function
  const login = (email, password) => {
    const auth = getAuth(app)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    const auth = getAuth(app)
    return signOut(auth)
  }

  const value = { signUp, currentUser, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
