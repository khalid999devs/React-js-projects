import classes from '../styles/Button.module.css'

const Button = ({ className, type = 'button', children, ...rest }) => {
  return (
    <button className={`${classes.button} ${className}`} type={type} {...rest}>
      {children}
    </button>
  )
}

export default Button
