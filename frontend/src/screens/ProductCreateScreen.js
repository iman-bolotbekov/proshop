import React, {useEffect, useState} from 'react';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {listProductCreate} from "../actions/productActions";

const ProductCreateScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product} = productCreate

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')


    useEffect(() => {
        if (successCreate) {
            navigate('/admin/productlist')
        }
    }, [successCreate, navigate])

    // const uploadFileHandler = async (e) => {
    //     const file = e.target.files[0]
    //     const formData = new FormData()
    //
    //     formData.append('image', file)
    //     return formData
    // }

    function submitHandler(e) {
        e.preventDefault()
        dispatch(listProductCreate({name, price, brand, category, countInStock, description, image}))
    }

    return (<div>
            <Link to={`/admin/productlist`}>Go Back</Link>
            <FormContainer>
                <h1>Create Product</h1>
                {loadingCreate ? <Loader/> : errorCreate ? <Message variant='danger'>{errorCreate}</Message> : (

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
                            <Form.Control type="file" multiple custom='true' label='Choose file'
                                          onChange={(e) => {
                                              const file = e.target.files[0]
                                              // console.log(e.target.files)
                                              // console.log(file)
                                              // const formData = new FormData()
                                              // console.log(formData)
                                              //
                                              //
                                              // formData.append('image', file)
                                              // console.log(formData)
                                              console.log(file.name)
                                              setImage(file.name)
                                          }}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-3'>
                            Create
                        </Button>
                    </Form>)}

            </FormContainer>
        </div>);
};

export default ProductCreateScreen;