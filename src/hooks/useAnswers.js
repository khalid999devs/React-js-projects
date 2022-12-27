import { useEffect, useState } from 'react'
import { getDatabase, ref, query, orderByKey, get } from 'firebase/database'

const useAnswers = (videoID) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const fetchAnswers = async () => {
      //database related works
      const db = getDatabase()
      const ansRef = ref(db, 'answers/' + videoID + '/questions')
      const ansQuery = query(ansRef, orderByKey())

      try {
        setError('')
        setLoading(true)
        //req firebase
        const snapshot = await get(ansQuery)

        if (snapshot.exists()) {
          setAnswers((prevAns) => {
            return [...prevAns, ...Object.values(snapshot.val())]
          })
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('failed to fetch videos')
      }
    }

    fetchAnswers()
  }, [videoID])

  return { loading, error, answers }
}

export default useAnswers
