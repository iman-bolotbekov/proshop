import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    function submitHandler(e) {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            {/*{message && <Message variant='danger'>{message}</Message>}*/}
            {/*{error && <Message variant='danger'>{error}</Message>}*/}
            {/*{loading && <Loader/>}*/}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Enter address' value={address ? address : ''}
                                  onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control required type='text' placeholder='Enter city' value={city ? city : ''}
                                  onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control required type='text' placeholder='Enter postal code'
                                  value={postalCode ? postalCode : ''}
                                  onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control required type='text' placeholder='Confirm country' value={country ? country : ''}
                                  onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;