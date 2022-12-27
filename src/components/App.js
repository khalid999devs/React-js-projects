import Home from '../pages/Home'
import Login from '../pages/Login'
import Quiz from '../pages/Quiz'
import Result from '../pages/Result'
import SIgnup from '../pages/SIgnup'
import '../styles/App.css'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='signup'
              element={
                <PrivateRoute backup={'/'} reverse={true}>
                  <SIgnup />
                </PrivateRoute>
              }
            />
            <Route
              path='login'
              element={
                <PrivateRoute backup={'/'} reverse={true}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path='quiz/:id'
              element={
                <PrivateRoute backup={'/login'}>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path='result/:id'
              element={
                <PrivateRoute backup={'/login'}>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
