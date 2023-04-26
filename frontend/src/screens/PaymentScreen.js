import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Col, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentMethod, saveShippingAddress} from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    function submitHandler(e) {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Cart' id='paypal' name='paymentMethod' checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;