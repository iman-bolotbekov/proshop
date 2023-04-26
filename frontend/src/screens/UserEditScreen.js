import React, {useEffect, useState} from 'react';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUser} from "../actions/userAction";
import {USER_UPDATE_RESET} from "../constants/userConstants";

const UserEditScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userUpdate = useSelector(state => state.userUpdate)
    const {success:successUpdate, error:errorUpdate, loading:loadingUpdate} = userUpdate

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userId = params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
         if(!user.name || user._id !== Number(userId)){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        }
    }, [userId, dispatch, user, successUpdate, navigate])

    function submitHandler(e) {
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }

    return (
        <div>
            <Link to={`/admin/userlist`}>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name}
                                          onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email}
                                          onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen;