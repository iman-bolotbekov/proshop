import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation, useRegisterMutation } from '../store/api/user.api'
import { signUpValues } from '../utils/formValues'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { ILoginData, IRegister, IRegisterData } from '../models/models'
import { signUpShema } from '../schemas'
import { useActions } from '../hooks/action'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()
  const { setUserInfo } = useActions()
  const onSubmitHandler = (values: IRegister) => {
    register({
      name: values.email,
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((response: IRegisterData) => {
        login({ username: response.email, password: values.password })
          .unwrap()
          .then((response: ILoginData) => {
            setUserInfo(response)
            toast.success(`${response.name} successfull logged in!`)
          })
          .catch((error) => {
            console.log('Login error:', error)
          })
        navigate(`/`)
      })
      .catch((error) => {
        if (error.data.detail.includes('UNIQUE')) {
          toast.error('Username already exists')
        }
        console.log('Register error:', error)
      })
  }
  const signUpForm = useFormik({
    initialValues: signUpValues,
    onSubmit: onSubmitHandler,
    validationSchema: signUpShema,
  })
  const { values, handleChange, handleSubmit, errors, touched } = signUpForm
  return (
    <div className="form-box">
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <p className="error">{errors.name && touched.name && errors.name}</p>
        </div>
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
        <div className="input-box">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter confirm password"
            name="rePassword"
            value={values.rePassword}
            onChange={handleChange}
          />
          <p className="error">
            {' '}
            {errors.rePassword && touched.rePassword && errors.rePassword}
          </p>
        </div>
        <button className="button" type="submit">
          Sing Up
        </button>
      </form>
      <p className="mt-6">
        Have an Account?{' '}
        <Link to={`/sign-in`} className="underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUp
