import { useEffect, useState } from 'react'
import { getDatabase, ref, query, orderByKey, get } from 'firebase/database'

const useQuestions = (videoID) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      //database related works
      const db = getDatabase()
      const quizRef = ref(db, 'quiz/' + videoID + '/questions')
      const quizQuery = query(quizRef, orderByKey())

      try {
        setError('')
        setLoading(true)
        //req firebase
        const snapshot = await get(quizQuery)

        if (snapshot.exists()) {
          setQuestions((questions) => {
            return [...questions, ...Object.values(snapshot.val())]
          })
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('failed to fetch videos')
      }
    }

    fetchQuestions()
  }, [videoID])

  return { loading, error, questions }
}

export default useQuestions
