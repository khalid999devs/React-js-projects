import React from 'react'
import Summary from '../components/Result/Summary'
import Analysis from '../components/Result/Analysis'
import { useLocation, useParams } from 'react-router-dom'
import useAnswers from '../hooks/useAnswers'
import _ from 'lodash'

const Result = () => {
  const { state } = useLocation()

  const { qna } = state

  const { id } = useParams()

  const { loading, error, answers } = useAnswers(id)

  const calculate = () => {
    let score = 0
    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = []

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2)
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2)
          option.checked = true
        }
      })

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5
      }
    })
    return score
  }

  const userScore = calculate()

  return (
    <>
      {error && <div>{error || 'There was an error'}</div>}
      {loading && 'loading...'}

      {!loading && answers.length === 0 ? (
        <div>No data found</div>
      ) : (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  )
}

export default Result
