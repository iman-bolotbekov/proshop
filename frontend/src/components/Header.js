import React from "react"
import {useSelector, useDispatch} from "react-redux";
import {Nav, Navbar, Container, NavDropdown, Dropdown} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {logout} from "../actions/userAction";
import SearchBox from "./SearchBox";

function Header() {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    function logoutHandler() {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    <Navbar.Brand>ProShop</Navbar.Brand>
                                </Nav.Link>
                            </LinkContainer>
                            <SearchBox/>
                            <div className='navbar-divider'></div>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>Cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                    {userInfo.isAdmin && (<NavDropdown.Divider/>)}
                                    {userInfo.isAdmin && (
                                        <Dropdown title='Admin' id='adminmenue' className='admin__selects'>
                                            <Dropdown.Toggle variant="secondary" className='p-0'>
                                                Admin
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <LinkContainer to='/admin/userlist'>
                                                    <Dropdown.Item>
                                                        Users
                                                    </Dropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to='/admin/productlist'>
                                                    <Dropdown.Item>
                                                        Products
                                                    </Dropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to='/admin/orderlist'>
                                                    <Dropdown.Item>
                                                        Orders
                                                    </Dropdown.Item>
                                                </LinkContainer>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}

                                </NavDropdown>
                            ) : (<LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>Login
                                </Nav.Link>
                            </LinkContainer>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
