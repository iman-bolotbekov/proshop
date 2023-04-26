import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getOrderDetail, payOrder, deliverOrder} from "../actions/orderAction";
import Loader from "../components/Loader";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";

const OrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const {order, error, loading} = orderDetails
    const orderId = params.id


    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        order.taxPrice = Number((0.082) * order.itemsPrice).toFixed(2)
        order.totalPrice = (Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.taxPrice)).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVwiEYgGMSrc53ATcpsIJw99g4vU1Zztibb2nNmTmW7NaJMkLkAY07qubMjEzZ-PedVjy-sX5ZEC_Qwq&currency=USD'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetail(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [orderId, dispatch, successPay, successDeliver])


    function successPaymentHandler(paymentResult=null) {
        dispatch(payOrder(orderId, paymentResult))
    }

    function successDeliverHandler() {
        dispatch(deliverOrder(order))
    }

    return <div>
        {loading ? <Loader/>
            : error ? <Message variant='danger' children={error}/>
                : (
                    <div>
                        <Row>
                            <Col md={8}>
                                <h1>Order:</h1>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>Name: {order.user.name}</p>
                                        <p>Email: {order.user.email}</p>
                                        <p>Shipping: {order.shippingAddress.address}</p>
                                        {order.isDelivered ? (
                                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>) : (
                                            <Message variant='warning'>Not Delivered</Message>)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Payment method</h2>
                                        <p>Method: {order.paymentMethod}</p>
                                        {order.isPaid ? (
                                            <Message variant='success'>Paid on {order.paidAt}</Message>
                                        ) : (<Message variant='warning'>Not Paid</Message>)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {order.orderItems.length === 0 ?
                                            <Message variant='info'>Order is empty</Message> :
                                            (<ListGroup variant='flush'>
                                                {order.orderItems.map(item => (
                                                    <ListGroup.Item key={item.product}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                <p>{item.qty} X ${item.price} =
                                                                    ${(item.price * item.qty).toFixed(2)}</p>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <ListGroup variant='flush'>

                                        <ListGroup.Item>
                                            <h2>Order Summary</h2>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Items:
                                                </Col>
                                                <Col>
                                                    ${order.itemsPrice}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Shipping:
                                                </Col>
                                                <Col>
                                                    ${order.shippingPrice}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Tax:
                                                </Col>
                                                <Col>
                                                    ${order.taxPrice}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Total:
                                                </Col>
                                                <Col>
                                                    ${order.totalPrice}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {/*<Message variant='info'>PayPal Buttons Disabled for live demo...</Message>*/}
                                                {!order.isPaid && (
                                                <ListGroup.Item>
                                                    {loadingPay && <Loader />}

                                                    {!sdkReady ? (
                                                        <Loader />
                                                    ) : (
                                                            <PayPalButton
                                                                amount={order.totalPrice}
                                                                onSuccess={successPaymentHandler}
                                                            />
                                                        )}
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup.Item>
                                        {loadingDeliver && <Loader/>}
                                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button type='button' className='btn btn-block'
                                                        onClick={successDeliverHandler}>
                                                    Mark As Deliver
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                )}
    </div>
};

export default OrderScreen;