import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form, Modal} from "react-bootstrap";
import Ratings from "../components/Ratings";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails, listProductReviewCreate} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";


const ProductScreen = () => {
    const labels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
    };

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [hover, setHover] = useState(-1);
    const [show, setShow] = useState(false);

    const productDetail = useSelector(state => state.productDetail)
    const {error: errorProductDetail, loading: loadingProductDetail, product} = productDetail

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        error: errorProductReview,
        loading: loadingProductReview,
        success: successProductReview
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id, successProductReview])

    function addToCartHandler() {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    function submitHandler(e) {
        e.preventDefault()
        dispatch(listProductReviewCreate(params.id, {rating, comment}))
        setShow(false)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {userInfo && <Button variant="light" onClick={() => setShow(true)}>Leave a rating</Button>}
            {loadingProductDetail ? <Loader/>
                : errorProductDetail ? <Message variant='danger' children={errorProductDetail}/>
                    :
                    (<div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>{/* product image */}
                            <Col md={3}>
                                <ListGroup variant='flush'>

                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Ratings value={product.rating} text={`${product.numReviews} reviews`}
                                                 color={'#f8e825'}/>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: ${product.description}
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col> {/* product name, rating, price and description */}
                            <Col md={3}>
                                <Card className='mb-5'>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button className='btn-block' disabled={product.countInStock === 0}
                                                    type='button' onClick={addToCartHandler}>Add to Cart</Button>
                                        </ListGroup.Item> {/* button 'Add to Cart' */}

                                        {/* Option for qty */}
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control as='select' value={qty}
                                                                      onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card>
                            </Col> {/* price, status, button and qty */}
                        </Row>
                        <Row>
                            <Col md={6}>
                                {loadingProductReview && <Loader/>}
                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                <ListGroup.Item>
                                    <Modal show={show} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Write a reviews</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form className='mb-4'>
                                                <Box sx={{width: 200, display: 'flex', alignItems: 'center',}}>
                                                    <Rating
                                                        name="hover-feedback"
                                                        value={rating}
                                                        precision={1}
                                                        onChange={(event, newValue) => {
                                                            setRating(newValue);
                                                        }}
                                                        onChangeActive={(event, newHover) => {
                                                            setHover(newHover);
                                                        }}
                                                        emptyIcon={<StarIcon style={{opacity: 0.55}}
                                                                             fontSize="inherit"/>}
                                                        style={{fontSize: '75px', marginBottom: '20px'}}
                                                    />
                                                    {rating !== null && (
                                                        <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : rating]}</Box>
                                                    )}
                                                </Box>
                                                <Form.Group controlId='comment'>
                                                    <Form.Control as='textarea' row={5} value={comment}
                                                                  className='mb-3'
                                                                  onChange={(e) => setComment(e.target.value)}
                                                                  placeholder='Tab your comment'>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer style={{justifyContent: 'space-between'}}>
                                            <Button variant="secondary" onClick={() => setShow(false)}>
                                                Back
                                            </Button>
                                            <Button disabled={loadingProductReview} type='submit'
                                                    variant='primary' onClick={submitHandler}>Save and Continue</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </ListGroup.Item>
                                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    <h4 className='pt-5'>Reviews</h4>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Ratings value={review.rating}/>
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>)}
        </div>
    );
};

export default ProductScreen;