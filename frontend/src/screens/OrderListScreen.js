import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import {listOrders} from "../actions/orderAction";
import {ORDER_LIST_RESET} from "../constants/orderConstants";

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state => state.orderList)
    const {loading: loadingOrderList, error: errorOrderList, orders} = orderList

    // const orderDelete = useSelector(state => state.orderDelete)
    // const {success: successOrderDelete, loading: loadingOrderDelete, error: errorOrderDelete} = orderDelete

    useEffect(() => {
        // dispatch({type: ORDER_CREATE_RESET})

        if (userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate])

    function deleteHandler(orderId) {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // Delete order
        }
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
                <Col className=''>
                    {/*<LinkContainer to={`/admin/product/create`}>*/}
                    {/*    <Button className='my-3' onClick={createProductHandler}>*/}
                    {/*        <i className='fas fa-plus'></i> Create Product*/}
                    {/*    </Button>*/}
                    {/*</LinkContainer>*/}
                </Col>
            </Row>

            {/*{loadingDelete && <Loader/>}*/}
            {/*{errorDelete && <Message variant='danger'>{errorDelete}</Message>}*/}

            {/*{loadingCreate && <Loader/>}*/}
            {/*{errorCreate && <Message variant='danger'>{errorCreate}</Message>}*/}

            {loadingOrderList ? <Loader/> : errorOrderList ? <Message variant='danger'>{errorOrderList}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CUSTOMER</th>
                        <th>PAYMENT METHOD</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) :
                                <i className='fas fa-times' style={{color: "red"}}></i>}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                <i className='fas fa-times' style={{color: "red"}}></i>}</td>

                            <td>

                                <LinkContainer to={`/order/${order._id}/`}><Button variant='light'
                                                                                   className='btn-sm'>Detail</Button></LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderListScreen;