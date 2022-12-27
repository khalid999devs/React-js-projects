import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, backup, reverse }) => {
  const { currentUser } = useAuth()

  if (reverse === true) return currentUser ? <Navigate to={backup} /> : children

  return !currentUser ? <Navigate to={backup} /> : children
}

export default PrivateRoute
