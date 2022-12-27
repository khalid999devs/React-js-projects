import classes from '../../styles/Form.module.css'

const Form = ({ children, className, onSubmit, ...rest }) => {
  return (
    <form
      className={`${classes.form} ${className}`}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  )
}

export default Form
