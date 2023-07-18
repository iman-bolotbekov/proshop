import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { editUserShema } from '../schemas'
import { IUpdateUser } from '../models/models'
import { useGetUserQuery, useUpdateUserMutation } from '../store/api/user.api'
import { useNavigate, useParams } from 'react-router-dom'

const AdminUserEdit = () => {
  const params = useParams()
  const navigate = useNavigate()
  const userId = params.userId ? parseInt(params.userId, 10) : 0
  const [updateUser] = useUpdateUserMutation()
  const { data: user } = useGetUserQuery(userId)
  const onSubmitHandler = (values: IUpdateUser) => {
    updateUser({
      name: values.name,
      email: values.email,
      isAdmin: values.isAdmin,
      id: user?.id || 0,
    })
      .unwrap()
      .then((response) => {
        navigate(`/admin/user`)
        toast.success(`User successfully updated!`)
      })
      .catch((error) => {
        console.log('User update error:', error)
        toast.error(`User didn't updated, error occured!`)
      })
  }
  const editUserForm = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      isAdmin: user?.isAdmin || false,
    } as IUpdateUser,
    onSubmit: onSubmitHandler,
    validationSchema: editUserShema,
  })
  const { values, handleChange, handleSubmit, errors, touched, setValues } =
    editUserForm
  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  }, [user, setValues])
  return (
    <div className="form-box">
      <h2 className="title">Edit</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter nama"
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
          <label htmlFor="">Is Admin</label>
          <input
            type="checkbox"
            className=""
            name="isAdmin"
            checked={values.isAdmin}
            onChange={handleChange}
          />
          <p className="error">
            {errors.isAdmin && touched.isAdmin && errors.isAdmin}
          </p>
        </div>

        <button className="button" type="submit">
          Edit User
        </button>
      </form>
    </div>
  )
}

export default AdminUserEdit
