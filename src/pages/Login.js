import { useState } from 'react'
import Button from '../components/Button'
import TextInput from '../components/FormFields/TextInput'
import Form from '../components/signup/Form'
import Illustration from '../components/signup/Illustration'
import classes from '../styles/Login.module.css'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeLogin = (e) => {
    setLoginInfo((loginInfo) => {
      return { ...loginInfo, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(loginInfo.email, loginInfo.password)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.code || 'Failed to login')
    }
  }

  return (
    <>
      <h1>Login to your account</h1>

      <div className='column'>
        <Illustration />
        <Form className={`${classes.login}`} onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Enter email'
            icon='alternate_email'
            name='email'
            value={loginInfo.email}
            onChange={onChangeLogin}
            required
          />

          <TextInput
            type='password'
            placeholder='Enter password'
            value={loginInfo.password}
            onChange={onChangeLogin}
            name='password'
            icon='lock'
            required
          />

          <Button disabled={loading} type='submit'>
            Submit Now
          </Button>

          {error && <p className='error'>{error}</p>}

          <div className='info'>
            Don't have an account? <a href='signup.html'>Signup</a> instead.
          </div>
        </Form>
      </div>
    </>
  )
}
