import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormikHelpers, useFormik } from 'formik'
import { toast } from 'react-toastify'
import { ICreateProduct } from '../models/models'
import { createProductShema } from '../schemas'
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../store/api/product.api'

const AdminProductEdit: React.FC = () => {
  const params = useParams()
  const productId = params.productId ? parseInt(params.productId, 10) : 0
  const { data: product } = useGetProductQuery(productId)
  const navigate = useNavigate()
  const [updateProduct] = useUpdateProductMutation()
  const onSubmitHandler = (
    values: ICreateProduct,
    action: FormikHelpers<ICreateProduct>
  ) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('price', JSON.stringify(values.price))
    formData.append('category', values.category)
    formData.append('brand', values.brand)
    formData.append('description', values.description)
    formData.append('countInStock', JSON.stringify(values.countInStock))
    if (values.image) formData.append('image', values.image)
    updateProduct({ product: formData, productId })
      .unwrap()
      .then((response) => {
        toast.success('Product updated successfully')
        navigate(`/admin/product/`)
      })
      .catch((error) => {
        console.log(`Product update error:`, error)
      })
  }
  const editProductForm = useFormik({
    initialValues: {
      name: '',
      price: '',
      brand: '',
      category: '',
      description: '',
      countInStock: 0,
      image: null,
    } as ICreateProduct,
    onSubmit: onSubmitHandler,
    validationSchema: createProductShema,
  })
  const { values, handleChange, handleSubmit, errors, touched, setValues } =
    editProductForm
  useEffect(() => {
    if (product) {
      setValues({
        name: product.name,
        price: product.price,
        brand: product.brand,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
        image: null,
      })
    }
  }, [setValues, product])
  return (
    <div className="form-box">
      <h2 className="title">Edit Product</h2>
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
          <label htmlFor="">Price</label>
          <input
            type="number"
            className="input"
            placeholder="Enter price"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <p className="error">
            {errors.price && touched.price && errors.price}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Brand</label>
          <input
            type="text"
            className="input"
            placeholder="Enter brand"
            name="brand"
            value={values.brand}
            onChange={handleChange}
          />
          <p className="error">
            {errors.brand && touched.brand && errors.brand}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Category</label>
          <input
            type="text"
            className="input"
            placeholder="Enter category"
            name="category"
            value={values.category}
            onChange={handleChange}
          />
          <p className="error">
            {errors.category && touched.category && errors.category}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Description</label>
          <input
            type="text"
            className="input"
            placeholder="Enter description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <p className="error">
            {errors.description && touched.description && errors.description}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Count in stock</label>
          <input
            type="number"
            className="input"
            placeholder="Enter countInStock"
            name="countInStock"
            value={values.countInStock}
            onChange={handleChange}
          />
          <p className="error">
            {errors.countInStock && touched.countInStock && errors.countInStock}
          </p>
        </div>
        <div className="input-box">
          <label htmlFor="">Image</label>
          <input
            className="formInputFile"
            type="file"
            name="images"
            accept=".jpg,.png,.jpeg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const files = event.target.files
              if (files) {
                const fileList = Array.from(files)
                editProductForm.setFieldValue('image', fileList[0])
              }
            }}
          />
        </div>
        <button className="button" type="submit">
          Edit Product
        </button>
      </form>
    </div>
  )
}

export default AdminProductEdit
