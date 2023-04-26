import React, {useEffect, useState} from 'react';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, listProductUpdate} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";
import axios from "axios";

const ProductEditScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productId = params.id

    const productUpdate = useSelector(state => state.productUpdate)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = productUpdate

    const productDetail = useSelector(state => state.productDetail)
    const {loading: loadingDetail, error: errorDetail, product} = productDetail


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')


    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setImage(product.image)
            }
        }
    }, [productId, dispatch, product, successUpdate, navigate])

    function submitHandler(e) {
        e.preventDefault()
        dispatch(listProductUpdate({_id: product._id, name, price, brand, category, countInStock, description, image}))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to={`/admin/productlist`}>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


                {loadingDetail ? <Loader/> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name}
                                          onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price}
                                          onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand}
                                          onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category}
                                          onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count in Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Brand' value={countInStock}
                                          onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={description}
                                          onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>

                            <Form.Label>Image</Form.Label>
                            {/*<Form.Control type='text' placeholder='Enter image' value={image}*/}
                            {/*              onChange={(e) => setImage(e.target.value)}></Form.Control>*/}
                            <p>Currently: {image?<Link to={`${image}`}>{image?.split('/')[2]}</Link>:'No photo'}</p>

                            <Form.Control type="file" multiple custom='true' label='Choose file'
                                          onChange={uploadFileHandler}></Form.Control>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-3'>
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;