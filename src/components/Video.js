import image from '../assets/images/3.jpg'
import classes from '../styles/Video.module.css'

const Video = ({ title, id, noq }) => {
  return (
    <div className={classes.video}>
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq}</p>
        <p>Total point : {noq * 5}</p>
      </div>
    </div>
  )
}

export default Video
