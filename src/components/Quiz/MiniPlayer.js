import { useRef, useState } from 'react'
import classes from '../../styles/Miniplayer.module.css'
import ReactPlayer from 'react-player/youtube'

const MiniPlayer = ({ id, title }) => {
  const buttonRef = useRef()
  const [status, setStatus] = useState(false)
  const videoURL = `https://www.youtube.com/watch?v=${id}`

  const toogleMiniPlayer = () => {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn)
      setStatus(true)
    } else {
      buttonRef.current.classList.add(classes.floatingBtn)
      setStatus(false)
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toogleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {' '}
        play_circle_filled{' '}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toogleMiniPlayer}
      >
        {' '}
        close{' '}
      </span>

      <ReactPlayer
        style={{ display: status ? 'block' : 'none' }}
        url={videoURL}
        width='300px'
        height={'168px'}
        playing={status}
        controls
      />
      <p>{title}</p>
    </div>
  )
}

export default MiniPlayer
