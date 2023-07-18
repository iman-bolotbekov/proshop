import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInValues } from '../utils/formValues'
import { signInShema } from '../schemas'
import { useLoginMutation } from '../store/api/user.api'
import { ILogin } from '../models/models'
import { toast } from 'react-toastify'
import { useActions } from '../hooks/action'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { setUserInfo } = useActions()
  const [login] = useLoginMutation()
  const onSubmitHandler = (values: ILogin) => {
    login({ username: values.email, password: values.password })
      .unwrap()
      .then((response) => {
        setUserInfo(response)
        toast.success(`${response.name} successfull logged in!`)
        navigate(`/`)
      })
      .catch((error) => {
        toast.error(`Didn't logged in, error is occured!`)
        console.log('Login error:', error)
      })
  }
  const signInForm = useFormik({
    initialValues: signInValues,
    onSubmit: onSubmitHandler,
    validationSchema: signInShema,
  })
  const { values, handleChange, handleSubmit, errors, touched } = signInForm
  return (
    <div className="form-box">
      <h2 className="title">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="">Email Address</label>
          <input
            type="text"
            className="input"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <p className="error">
            {errors.email && touched.email && errors.email}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <p className="error">
            {errors.password && touched.password && errors.password}
          </p>
        </div>
        <button className="button" type="submit">
          Sing In
        </button>
      </form>
      <p className="mt-6">
        New Customer?{' '}
        <Link to={`/sign-up`} className="underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
