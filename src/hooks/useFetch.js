import { useEffect, useState } from 'react'

const useFetch = (url, method, headers) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const requestFetch = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(url, {
          method: method || 'GET',
          headers: headers,
        })
        const data = await response.json()
        setLoading(false)
        setResult(data)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('There was a problem fetching the data')
      }
    }
    requestFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { loading, error, result }
}

export default useFetch
