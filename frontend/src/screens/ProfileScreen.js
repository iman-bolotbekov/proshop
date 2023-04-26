import React, {useEffect, useState} from 'react';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../actions/userAction";
import {USER_PROFILE_RESET} from "../constants/userConstants";
import {myListOrders} from "../actions/orderAction";
import {ORDER_MY_LIST_RESET} from "../constants/orderConstants";

const ProfileScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderMyList = useSelector(state => state.orderMyList)
    const {myOrders, loading: loadingOrdersList, error: errorOrders, success: successOrderMyList} = orderMyList

    const userDetails = useSelector(state => state.userDetails)
    const {loading: loadingUserDetail, error: errorUserDetail, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdateProfile} = userUpdateProfile

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || successUpdateProfile || userInfo._id !== user._id) {
                dispatch({type: USER_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(myListOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user, successUpdateProfile])

    function submitHandler(e) {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Users Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {errorUserDetail && <Message variant='danger'>{errorUserDetail}</Message>}
                {loadingUserDetail && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='text' placeholder='Enter Name' value={name}
                                      onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control required type='email' placeholder='Enter Email' value={email}
                                      onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password}
                                      onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword}
                                      onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrdersList ? (<Loader/>) : errorOrders ? (<Message variant='danger'>{errorOrders}</Message>) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                        </thead>

                        <tbody>
                        {myOrders.map(myOrder => (
                            <tr key={myOrder._id}>
                                <td>{myOrder._id}</td>
                                <td>{myOrder.createdAt.substring(0, 10)}</td>
                                <td>{myOrder.totalPrice}</td>
                                <td>{myOrder.isPaid ? myOrder.paidAt.substring(0, 10) :
                                    <i className='fas fa-times' style={{color: "red"}}></i>}</td>
                                <td><LinkContainer to={`/order/${myOrder._id}`}><Button type='button'
                                                                                        className='btn-sm'>Details</Button></LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>)}
            </Col>
        </Row>
    );
};

export default ProfileScreen;