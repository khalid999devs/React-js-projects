import { Fragment } from 'react'
import classes from '../../styles/Answers.module.css'
import CheckBox from '../FormFields/ChceckBox'

const Answers = ({ options, handleChange, input = true }) => {
  return (
    <>
      <div className={classes.answers}>
        {options.map((option, key) => {
          return (
            <Fragment key={key}>
              {input === true ? (
                <CheckBox
                  className={classes.answer}
                  text={option.title}
                  value={key}
                  checked={option.checked}
                  onChange={(e) => handleChange(e, key)}
                />
              ) : (
                <CheckBox
                  className={`${classes.answer} ${
                    option.correct
                      ? classes.correct
                      : option.checked
                      ? classes.wrong
                      : null
                  }`}
                  text={option.title}
                  defaultChecked={option.checked}
                  disabled
                />
              )}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default Answers
