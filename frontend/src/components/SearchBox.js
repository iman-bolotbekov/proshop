import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";


const SearchBox = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

    function submitHandler(e) {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=${1}`)
        } else {
            navigate(`${location.pathname}`)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='search-box'>
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)}
                          className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;