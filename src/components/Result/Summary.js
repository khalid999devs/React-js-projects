import classes from '../../styles/Result/Summary.module.css'
import successImage from '../../assets/images/success.png'
import useFetch from '../../hooks/useFetch'
import { useMemo } from 'react'

const Summary = ({ score = 0, noq = 0 }) => {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return 'failed'
    } else if ((score / (noq * 5)) * 100 < 75) {
      return 'good'
    } else if ((score / (noq * 5)) * 100 < 100) {
      return 'very good'
    } else {
      return 'excellent'
    }
  }, [score, noq])

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    'GET',
    {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY,
    }
  )

  const image = result ? result?.photos[0].src.medium : successImage

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {error && (
        <div className={classes.badge}>{error || 'There was an error'}</div>
      )}
      {loading && <div className={classes.badge}>Loading your badge...</div>}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt='success' />
        </div>
      )}
    </div>
  )
}

export default Summary
