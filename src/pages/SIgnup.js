import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/Button'
import ChceckBox from '../components/FormFields/ChceckBox'
import TextInput from '../components/FormFields/TextInput'
import Form from '../components/signup/Form'
import Illustration from '../components/signup/Illustration'
import { useAuth } from '../contexts/AuthContext'
import classes from '../styles/Signup.module.css'

const SIgnup = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return setError("Passwords don't match")
    try {
      setError('')
      setLoading(true)
      await signUp(email, password, username)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.code || 'Failed to create account')
    }
  }

  return (
    <>
      <h1>create an account</h1>
      <div className='column'>
        <Illustration />

        <Form className={`${classes.signup}`} onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Enter Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            icons='person'
          />
          <TextInput
            type='email'
            placeholder='Enter email'
            icons='alternate_email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type='password'
            placeholder='Enter password'
            icons='lock'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            type='password'
            placeholder='confirm password'
            icons='lock_clock'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ChceckBox
            value={agree}
            required
            onChange={() => setAgree(!agree)}
            text={'I agree to the Terms & Conditions'}
          />
          <Button disabled={loading} type='submit'>
            <span>Submit now</span>
          </Button>

          {error && <p className='error'>{error}</p>}

          <div className='info'>
            Already have an account? <a href='login.html'>Login</a> instead.
          </div>
        </Form>
      </div>
    </>
  )
}

export default SIgnup
