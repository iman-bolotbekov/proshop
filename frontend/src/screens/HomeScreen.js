import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useLocation} from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (<div>
        {!keyword && <ProductCarousel/>}
        <h1>Latest Products</h1>
        {loading ? <Loader/> : error ? <Message variant='danger' children={error}/> :
            (<Row>
                {products.map(product => (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>))}
                <Paginate page={page} pages={pages} keyword={keyword}/>
            </Row>)}
    </div>);
};

export default HomeScreen;