import { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import Answers from '../components/Quiz/Answers'
import MiniPlayer from '../components/Quiz/MiniPlayer'
import ProgressBar from '../components/Quiz/ProgressBar'
import useQuestions from '../hooks/useQuestions'
import _ from 'lodash'
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, set } from 'firebase/database'
import { useNavigate, useLocation } from 'react-router-dom'

const initialState = []
const reducer = (state, action) => {
  switch (action.type) {
    case 'questions':
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false
        })
      })
      return action.value

    case 'answer':
      const questions = _.cloneDeep(state)
      questions[action.questionID].options[action.optionIndex].checked =
        action.value

      return questions

    default:
      return state
  }
}

const Quiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const videoTitle = location.state?.videoTitle

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { loading, error, questions } = useQuestions(id)

  const [qna, dispatch] = useReducer(reducer, initialState)
  const { currentUser } = useAuth()

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    })
  }, [questions])

  const handleAnsChange = (e, index) => {
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    })
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length)
      setCurrentQuestion((prevCurrentQues) => prevCurrentQues + 1)
  }
  const prevQuestion = () => {
    if (currentQuestion > 0 && currentQuestion <= questions.length)
      setCurrentQuestion((prevCurrentQues) => prevCurrentQues - 1)
  }

  const submit = async () => {
    const { uid } = currentUser

    const db = getDatabase()
    const resultRef = ref(db, `result/${uid}`)

    await set(resultRef, {
      [id]: qna,
    })

    navigate(`/result/${id}`, { state: { qna } })
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  return (
    <>
      <h1>
        {qna[currentQuestion] ? qna[currentQuestion].title : 'Loading...'}
      </h1>
      <h4>Question can have multiple answers</h4>
      <Answers
        options={qna[currentQuestion] ? qna[currentQuestion].options : []}
        handleChange={handleAnsChange}
      />
      <ProgressBar
        next={nextQuestion}
        prev={prevQuestion}
        progress={percentage}
        submit={submit}
      />
      <MiniPlayer id={id} title={videoTitle} />

      {!loading && questions.length === 0 && <div>No data found</div>}
      {error && <div>{error || 'There was an error'}</div>}
      {loading && 'loading...'}
    </>
  )
}

export default Quiz
