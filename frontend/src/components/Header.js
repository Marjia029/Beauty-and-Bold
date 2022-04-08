import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar,Nav,Container,Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

     const logoutHandler  = ()=>{
        //  console.log('Logout')
        dispatch(logout)
   }

    return (
        <header>
            <Navbar bg="warning" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            {/* <img
                            src="/bbn.png"
                            width="100"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Beauty&Bold logo"
                        />{' '} */}
                        Beauty&Bold</Navbar.Brand>
                    </LinkContainer>
                    {/* <Navbar.Brand href="#home">
                        <img
                            src="/bb.jpg"
                            width="100"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Beauty&Bold logo"
                        />
                    </Navbar.Brand> */}
                    

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart">Cart</i> </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title = {userInfo.name} id = 'username'>
                                <LinkContainer to = '/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            
                                <Nav.Link ><i className="fas fa-user">LogIn</i></Nav.Link>
                            </LinkContainer>
                            ) }
                        
                        
                        
                        
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header